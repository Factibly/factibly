from fakenews_backend.apps.core.gql.mutations.remove_bookmarks import RemoveBookmarks
from fakenews_backend.apps.core.gql.mutations import remove_bookmarks
from .mutations import SearchContent, RateContent, BookmarkContent, RemoveBookmark, UpvoteRating, DownvoteRating
from graphene import ObjectType, relay, ID, Field
from .types import ContentType


class Mutation(ObjectType):
    search_content = SearchContent.Field()
    rate_content = RateContent.Field()
    bookmark_content = BookmarkContent.Field()
    remove_bookmark = RemoveBookmark.Field()
    remove_bookmarks = RemoveBookmarks.Field()
    upvote_rating = UpvoteRating.Field()
    downvote_rating = DownvoteRating.Field()


class Query(ObjectType):
    content = Field(ContentType, id=ID(required=True))

    def resolve_content(self, info, id):
        content = relay.Node.get_node_from_global_id(info, id)
        content.search_count += 1
        content.save()

        return content
