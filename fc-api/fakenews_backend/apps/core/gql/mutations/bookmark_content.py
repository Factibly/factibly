from graphene import Boolean, ID, Node
from ....base_mutation import BaseMutation
from ..types import ContentType
from graphql_jwt.decorators import login_required


class BookmarkContent(BaseMutation):
    bookmarked = Boolean()

    class Input:
        content_id = ID(required=True)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, content_id):
        user = info.context.user
        content = Node.get_node_from_global_id(
            info, content_id, only_type=ContentType)

        user.bookmarks.add(content)
        return BookmarkContent(bookmarked=True)
