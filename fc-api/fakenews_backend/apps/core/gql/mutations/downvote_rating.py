from graphene import Field, ID, Node
from ..types import RatingType
from ...models import Rating
from ....base_mutation import BaseMutation
from graphql_jwt.decorators import login_required


class DownvoteRating(BaseMutation):
    rating = Field(RatingType)

    class Input:
        rating_id = ID(required=True)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, rating_id):
        # Django raises DoesNotExist exception if rating_id does not exist
        rating = Node.get_node_from_global_id(
            info, rating_id, only_type=RatingType)
        if rating:
            rating.downvote_count -= 1

        rating.save()
        return DownvoteRating(rating=rating)
