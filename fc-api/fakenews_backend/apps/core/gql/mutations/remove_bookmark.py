from graphene import Boolean, ID, Node
from ..types import ContentType
from ....base_mutation import BaseMutation
from graphql_jwt.decorators import login_required


class RemoveBookmark(BaseMutation):
    removed = Boolean()

    class Input:
        content_id = ID(required=True)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, content_id):
        user = info.context.user
        content = Node.get_node_from_global_id(
            info, content_id, only_type=ContentType)

        user.bookmarks.remove(content)
        return RemoveBookmark(removed=True)
