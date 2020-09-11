from graphene import Field, ID, Node
from ..types import RatingType
from ....base_mutation import BaseMutation
from graphql_jwt.decorators import login_required


class UpvoteRating(BaseMutation):
    rating = Field(RatingType)

    class Input:
        rating_id = ID(required=True)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, rating_id):
        user = info.context.user
        rating = Node.get_node_from_global_id(
            info, rating_id, only_type=RatingType)

        if rating in user.downvotes.all():
            user.downvotes.remove(rating)

        if rating in user.upvotes.all():
            user.upvotes.remove(rating)
        else:
            user.upvotes.add(rating)

        user.save()

        return UpvoteRating(rating=rating)
