from graphene_django import DjangoObjectType
from graphene import relay, Field, Float, Boolean, List
from ..models import Rating, Content


class RatingType(DjangoObjectType):
    class Meta:
        model = Rating
        interfaces = (relay.Node,)


class ContentType(DjangoObjectType):
    class Meta:
        model = Content
        interfaces = (relay.Node,)

    user_rating = Field(RatingType)
    overall_score = Float()
    is_bookmarked = Boolean()

    rating_set = List(RatingType)

    def resolve_user_rating(self, info):
        user = info.context.user

        if user.is_anonymous:
            return None

        qs = Rating.objects.filter(user=user, content=self)

        return qs[0] if qs else None

    def resolve_overall_score(self, info):
        # ignore this pylint
        return self.overall_rating()

    def resolve_is_bookmarked(self, info):
        user = info.context.user
        if user.is_anonymous:
            return False

        return self in user.bookmarks.all()

    def resolve_rating_set(self, info):
        return self.rating_set.all()
