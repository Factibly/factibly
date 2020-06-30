import graphene
from graphene_django import DjangoObjectType
from .models import Content
import requests


class UrlError(Exception):
    pass


class ContentType(DjangoObjectType):
    class Meta:
        model = Content


class CreateContent(graphene.Mutation):
    content = graphene.Field(ContentType)

    class Arguments:
        url = graphene.String(required=True)

    def mutate(self, info, url):
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
            content.save()

            return CreateContent(content=content)

        raise UrlError("Provided Url is Invalid")


class Mutation(graphene.ObjectType):
    create_content = CreateContent.Field()


# class Query(graphene.ObjectType):
#     current_user = graphene.Field(UserType)

#     def resolve_current_user(self, info):
#         user = info.context.user
#         if user.is_anonymous:
#             raise Exception('Not logged in!')

#         return user
