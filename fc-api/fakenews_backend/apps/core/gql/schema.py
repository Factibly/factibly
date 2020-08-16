from .mutations import SearchContent, RateContent, BookmarkContent, RemoveBookmark, UpvoteRating, DownvoteRating
from graphene import ObjectType, relay, ID
from .types import ContentType


class Mutation(ObjectType):
    search_content = SearchContent.Field()
    rate_content = RateContent.Field()
    bookmark_content = BookmarkContent.Field()
    remove_bookmark = RemoveBookmark.Field()
    upvote_rating = UpvoteRating.Field()
    downvote_rating = DownvoteRating.Field()


class Query(ObjectType):
    content = relay.Node.Field(ContentType, content_id=ID(required=True))
