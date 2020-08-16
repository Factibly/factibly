from graphene import Field, String, ID, Float, Node
from ..types import RatingType, ContentType
from ...models import Rating
from ....base_mutation import BaseMutation

from fakenews_backend.common.utils.recaptcha_validation import validate_recaptcha_v3
from graphql_jwt.decorators import login_required


class RateContent(BaseMutation):
    rating = Field(RatingType)

    class Input:
        content_id = ID(required=True)
        score1 = Float(required=True)
        score2 = Float(required=True)
        score3 = Float(required=True)
        recaptcha_token = String(required=True)
        justification = String(required=False)

    @classmethod
    @login_required
    def mutate_and_get_payload(cls, root, info, content_id, score1, score2, score3, recaptcha_token, justification=None):
        validate_recaptcha_v3(recaptcha_token, 'submit_rating')

        user = info.context.user
        content = Node.get_node_from_global_id(
            info, content_id, only_type=ContentType)

        qs = Rating.objects.filter(user=user, content=content)

        if qs:
            rating = qs[0]
            rating.score1 = score1
            rating.score2 = score2
            rating.score3 = score3
            rating.justification = justification
        else:
            rating = Rating(content=content, user=user,
                            justification=justification, country=user.country, score1=score1, score2=score2, score3=score3)

        rating.save()
        return RateContent(rating=rating)
