from graphene_django import DjangoObjectType
from graphene import relay, List
from ..models import User
from ...core.gql.types import ContentType, RatingType


class UserType(DjangoObjectType):
    class Meta:
        model = User
        interfaces = (relay.Node,)

    bookmarks = List(ContentType)
    upvotes = List(RatingType)
    downvotes = List(RatingType)

    def resolve_bookmarks(self, info):
        return self.bookmarks.all()

    def resolve_upvotes(self, info):
        return self.upvotes.all()

    def resolve_downvotes(self, info):
        return self.downvotes.all()
