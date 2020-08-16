import graphene
import graphql_jwt
from graphql_jwt.decorators import login_required
from graphene_django import DjangoObjectType
import requests

from .models import User

import os
from django.conf import settings
from django.contrib.auth.password_validation import validate_password, MinimumLengthValidator
from fakenews_backend.apps.users.password_validation import *


class UserType(DjangoObjectType):
    class Meta:
        model = User


class ObtainJSONWebToken(graphql_jwt.JSONWebTokenMutation):
    user = graphene.Field(UserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(user=info.context.user)


class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)
        date_of_birth = graphene.types.datetime.Date(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        display_name = graphene.String(required=True)
        country = graphene.String(required=True)
        recaptcha_token = graphene.String(required=True)

    def mutate(self, info, email, password, date_of_birth, first_name, last_name, display_name, country, recaptcha_token):
        if settings.DEBUG:
            secret = os.getenv("DEV_RECAPTCHA_V2_SECRET_KEY")
        else:
            secret = os.getenv("PROD_RECAPTCHA_V2_SECRET_KEY")
        recaptcha_data = {
            "secret": secret,
            "response": recaptcha_token
        }
        recaptcha_req = requests.post(
            "https://www.google.com/recaptcha/api/siteverify",
            data=recaptcha_data
        )
        if not (recaptcha_req.json())["success"]:
            raise Exception('Unsuccessful recaptcha attempt!')

        user = User(
            email=email,
            date_of_birth=date_of_birth,
            first_name=first_name,
            last_name=last_name,
            display_name=display_name,
            country=country
        )

        password_validators = [
            MinimumLengthValidator(),
            UpperCaseValidator(),
            NumericalValidator(),
        ]

        validate_password(
            password, user, password_validators=password_validators
        )

        user.set_password(password)
        user.save()

        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    token_auth = ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()


class Query(graphene.ObjectType):
    current_user = graphene.Field(UserType)

    @login_required
    def resolve_current_user(self, info):
        return info.context.user
