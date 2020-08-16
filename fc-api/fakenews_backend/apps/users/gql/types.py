from graphene_django import DjangoObjectType
from graphene import relay, List
from ..models import User
from ...core.gql.types import ContentType


class UserType(DjangoObjectType):
    class Meta:
        model = User
        interfaces = (relay.Node,)

    bookmarks = List(ContentType)

    def resolve_bookmarks(self, info):
        return self.bookmarks.all()
