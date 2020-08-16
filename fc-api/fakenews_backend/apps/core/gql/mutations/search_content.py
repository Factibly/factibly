from graphene import Field, String
from ..types import ContentType
from ...models import Content
from ...scrape import scrape_article
from graphql import GraphQLError
from ....base_mutation import BaseMutation
import requests


class SearchContent(BaseMutation):
    content = Field(ContentType)

    class Input:
        url = String(required=True)

    @classmethod
    def mutate_and_get_payload(cls, root, info, url):
        invalid_url_msg = "Invalid URL #@home.search.alert.msg.invalidUrl.name@"
        try:
            if not url.startswith("http://") and not url.startswith("https://"):
                url = "https://" + url

            hash_index = url.find("#")

            if hash_index >= 0:
                url = url[:hash_index]

            qs = Content.objects.filter(url=url)
            if qs.exists():
                return SearchContent(content=qs[0])

            response = requests.get(url)
            response_url = response.url

            if response.status_code == 200:
                qs2 = Content.objects.filter(url=response_url)
                if qs2.exists():
                    return SearchContent(content=qs2[0])

                content = Content(url=response_url)
                scrape_article(content)
                # content.save()

                return SearchContent(content=content)

            raise GraphQLError(invalid_url_msg)
        except:
            raise GraphQLError(invalid_url_msg)
