import graphene
import requests
from graphene_django import DjangoObjectType
from .models import Content, Rating, SavedContentList
from .scrape import scrape_article
from graphql_jwt.decorators import login_required


class UrlError(Exception):
    pass


class RatingType(DjangoObjectType):
    class Meta:
        model = Rating


class ContentType(DjangoObjectType):
    class Meta:
        model = Content

    user_rating = graphene.Field(RatingType)
    overall_score = graphene.Float()

    def resolve_user_rating(self, info):
        user = info.context.user

        if user.is_anonymous:
            return None

        qs = Rating.objects.filter(user=user, content=self)

        return qs[0] if qs else None

    def resolve_overall_score(self, info):
        # ignore this pylint
        return self.overall_rating()


class SavedContentListType(DjangoObjectType):
    class Meta:
        model = SavedContentList


class CreateContent(graphene.Mutation):
    content = graphene.Field(ContentType)

    class Arguments:
        url = graphene.String(required=True)

    def mutate(self, info, url):
        if not url.startswith("http://") and not url.startswith("https://"):
            url = "https://" + url

        hash_index = url.find("#")

        if hash_index >= 0:
            url = url[:hash_index]

        qs = Content.objects.filter(url=url)
        if qs.exists():
            return CreateContent(content=qs[0])

        response = requests.get(url)
        response_url = response.url

        if response.status_code == 200:
            qs2 = Content.objects.filter(url=response_url)
            if qs2.exists():
                return CreateContent(content=qs2[0])

            content = Content(url=response_url)
            scrape_article(content)
            # content.save()

            return CreateContent(content=content)

        raise UrlError("Provided Url is Invalid")


class RateContent(graphene.Mutation):
    rating = graphene.Field(RatingType)

    class Arguments:
        content_id = graphene.ID(required=True)
        score1 = graphene.Float(required=True)
        score2 = graphene.Float(required=True)
        score3 = graphene.Float(required=True)
        justification = graphene.String(required=False)

    # TODO: Implement rating a piece of media
    @login_required
    def mutate(self, info, content_id, score1, score2, score3, justification=None):
        user = info.context.user
        content = Content.objects.get(pk=content_id)

        qs = Rating.objects.filter(user=user, content=content)

        if qs:
            rating = qs[0]
            rating.score1 = score1
            rating.score2 = score2
            rating.score3 = score3
            rating.justification = justification
        else:
            rating = Rating(content=content, user=user,
                            justification=justification, country=user.country, score1=score1, score2=score2, score3=score3)

        rating.save()
        return RateContent(rating=rating)

class UpvoteRating(graphene.Mutation):
    rating = graphene.Field(RatingType)

    class Arguments:
        rating_id = graphene.ID(required=True)

    @login_required
    def mutate(self, info, rating_id):

        # Django raises DoesNotExist exception if rating_id does not exist
        rating = Rating.objects.get(pk=rating_id)

        if rating:
            rating.upvote_count += 1

        rating.save()
        return UpvoteRating(rating=rating)

class DownvoteRating(graphene.Mutation):
    rating = graphene.Field(RatingType)

    class Arguments:
        rating_id = graphene.ID(required=True)

    @login_required
    def mutate(self, info, rating_id):

        # Django raises DoesNotExist exception if rating_id does not exist
        rating = Rating.objects.get(pk=rating_id)

        if rating:
            rating.downvote_count -= 1

        rating.save()
        return DownvoteRating(rating=rating)

class BookmarkContent(graphene.Mutation):
    saved_list = graphene.Field(SavedContentListType)

    class Arguments:
        content_id = graphene.ID(required=True)

    @login_required
    def mutate(self, info, content_id):
        user = info.context.user
        content = Content.objects.get(pk=content_id)

        # Create a bookmark list if it doesn't already exist
        if hasattr(user, 'savedcontentlist'):
            saved_list = user.savedcontentlist
        else:
            saved_list = SavedContentList(user=user)
            saved_list.save()

        saved_list.contents.add(content)


class Mutation(graphene.ObjectType):
    create_content = CreateContent.Field()
    rate_content = RateContent.Field()
    bookmark_content = BookmarkContent.Field()
    upvote_rating = UpvoteRating.Field()
    downvote_rating = DownvoteRating.Field()


class Query(graphene.ObjectType):
    content = graphene.Field(ContentType, content_id=graphene.ID())

    def resolve_content(self, info, content_id):
        content = Content.objects.get(pk=content_id)
        content.search_count += 1
        content.save()

        return content
