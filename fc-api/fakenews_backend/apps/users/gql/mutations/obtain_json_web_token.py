from graphql_jwt import JSONWebTokenMutation
from graphene import Field
from ..types import UserType


class ObtainJSONWebToken(JSONWebTokenMutation):
    user = Field(UserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(user=info.context.user)
