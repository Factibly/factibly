from .mutations import CreateUser, ObtainJSONWebToken
from .types import UserType
from graphene import ObjectType, Field
from graphql_jwt import Verify, Refresh, DeleteJSONWebTokenCookie, DeleteRefreshTokenCookie


class Mutation(ObjectType):
    create_user = CreateUser.Field()
    login = ObtainJSONWebToken.Field()
    verify_token = Verify.Field()
    refresh_token = Refresh.Field()
    delete_token_cookie = DeleteJSONWebTokenCookie.Field()
    delete_refresh_token_cookie = DeleteRefreshTokenCookie.Field()


class Query(ObjectType):
    current_user = Field(UserType)

    def resolve_current_user(self, info):
        user = info.context.user

        return user if user.is_authenticated else None
