from graphene import Boolean, List, ID, Node
from ..types import ContentType
from ....base_mutation import BaseMutation
from graphql_jwt.decorators import login_required


class RemoveBookmarks(BaseMutation):
    removed = Boolean()

    class Input:
        content_ids = List(ID, required=True)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, content_ids):
        user = info.context.user

        for content_id in content_ids:
            content = Node.get_node_from_global_id(
                info, content_id, only_type=ContentType)
            user.bookmarks.remove(content)

        return RemoveBookmarks(removed=True)
