import graphene
from graphene_django import DjangoObjectType
from .models import User

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


class Query(graphene.ObjectType):
    user = graphene.Field(UserType)