from django.db.models import Avg, F
from graphene_django import DjangoObjectType
from graphene import relay, ObjectType, Field, NonNull, Float, Boolean, Int, List
from ..models import Rating, Content
from ..bibliography_creator.reference_creator import CitationType, ReferenceCreator
from django.utils import timezone
from datetime import timedelta


class RatingType(DjangoObjectType):
    class Meta:
        model = Rating
        interfaces = (relay.Node,)

    is_upvoted = Boolean()
    is_downvoted = Boolean()
    upvote_count = Int()
    downvote_count = Int()

    def resolve_is_upvoted(self, info):
        user = info.context.user
        if user.is_anonymous:
            return False

        return self in user.upvotes.all()

    def resolve_is_downvoted(self, info):
        user = info.context.user
        if user.is_anonymous:
            return False

        return self in user.downvotes.all()

    def resolve_upvote_count(self, info):
        return len(self.upvote_users.all())

    def resolve_downvote_count(self, info):
        return len(self.downvote_users.all())


class RatingTemporalTrendType(ObjectType):
    months_ago = NonNull(Int)
    score1_mean = Float()
    score2_mean = Float()
    score3_mean = Float()
    overall_mean = Float()


class ContentType(DjangoObjectType):
    class Meta:
        model = Content
        interfaces = (relay.Node,)

    user_rating = Field(RatingType)
    overall_score = Float()
    is_bookmarked = Boolean()

    reference_set = List(CitationType)

    rating_set = List(RatingType)
    rating_temporal_trends_set = List(RatingTemporalTrendType)

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

    def resolve_reference_set(self, info):
        return ReferenceCreator(self).create_references()

    def resolve_rating_set(self, info):
        return self.rating_set.all()

    def resolve_rating_temporal_trends_set(self, info):
        now = timezone.now()
        last_year_date = now - timedelta(days=365)

        scores = Rating.objects \
            .filter(content=self, created_at__gte=last_year_date) \
            .annotate(rating_score=(F('score1') + F('score2') + F('score3'))/3) \
            .values('created_at__year', 'created_at__month') \
            .annotate(Avg('score1'), Avg('score2'), Avg('score3'), overall__avg=Avg('rating_score'))

        trends = [None] * 12
        for score in scores:
            year_month_offset = (score['created_at__year'] - now.year) * 12
            month_month_offset = abs(score['created_at__month'] - now.month)

            rtt = RatingTemporalTrendType()
            rtt.months_ago = abs(year_month_offset - month_month_offset)
            rtt.score1_mean = score['score1__avg']
            rtt.score2_mean = score['score2__avg']
            rtt.score3_mean = score['score3__avg']
            rtt.overall_mean = score['overall__avg']

            trends[11 - rtt.months_ago] = rtt

        return trends
