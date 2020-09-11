from graphene import String, types, Field, ID
from ..types import UserType
from ...models import User
from ....base_mutation import BaseMutation
from graphene_file_upload.scalars import Upload

from django.contrib.auth.password_validation import validate_password, MinimumLengthValidator
from fakenews_backend.common.validations.password_validation import UpperCaseValidator, NumericalValidator
from fakenews_backend.common.validations.recaptcha_validation import validate_recaptcha_v2
import re


class CreateUser(BaseMutation):
    user = Field(UserType)

    class Input:
        email = String(required=True)
        password = String(required=True)
        date_of_birth = types.datetime.Date(required=True)
        first_name = String(required=True)
        last_name = String(required=True)
        display_name = String(required=True)
        country = String(required=True)
        recaptcha_token = String(required=True)
        avatar = Upload(required=False)

    @classmethod
    def mutate_and_get_payload(cls, root, info, email, password, date_of_birth, first_name, last_name, display_name, country, recaptcha_token, avatar=None):
        validate_recaptcha_v2(recaptcha_token)

        if avatar is not None and not re.search(r'^.*\.(jpg|jpeg|png)$', str(avatar), re.IGNORECASE):
            raise Exception(
                'Invalid image format #@user.avatar.alert.mime.error@')

        user = User(
            email=email,
            date_of_birth=date_of_birth,
            first_name=first_name,
            last_name=last_name,
            display_name=display_name,
            country=country,
            avatar=avatar
        )

        # image_moderation_score = moderate_image_s3(user.avatar)
        # if image_moderation_score >= ImageModerationScore.WARNING:
        #     s3 = boto3.resource('s3')
        #     s3.Object(
        #         os.environ['AWS_STORAGE_BUCKET_NAME'],
        #         user.avatar
        #     ).delete()
        #     raise Exception('Inappropriate image, select a different image')

        password_validators = [
            MinimumLengthValidator(),
            UpperCaseValidator(),
            NumericalValidator(),
        ]
        validate_password(
            password, user, password_validators=password_validators
        )
        user.set_password(password)

        user.save()

        return CreateUser(user=user)
