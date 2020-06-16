import graphene
from graphene_django import DjangoObjectType
from .models import User
import graphql_jwt

class UserType(DjangoObjectType):
    class Meta:
        model = User

class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        date_of_birth = graphene.types.datetime.Date(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        display_name = graphene.String(required=True)

    def mutate(self, info, email, password, date_of_birth, first_name, last_name, display_name):
        user = User(
            email=email, 
            date_of_birth=date_of_birth, 
            first_name=first_name,
            last_name=last_name,
            display_name=display_name
        )

        user.set_password(password)
        user.save()

        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


class Query(graphene.ObjectType):
    current_user = graphene.Field(UserType)

    def resolve_current_user(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')

        return user
