from django.conf import settings

import os
import requests


fail_msg = 'Unsuccessful reCAPTCHA attempt #@app.recaptcha.alert.msg.fail@'


def validate_recaptcha(version: int, recaptcha_token: str):
    secret = os.environ[f'{"DEV" if settings.DEBUG else "PROD"}_RECAPTCHA_V{version}_SECRET_KEY']

    recaptcha_data = {
        'secret': secret,
        'response': recaptcha_token
    }
    recaptcha_req = requests.post(
        'https://www.google.com/recaptcha/api/siteverify',
        data=recaptcha_data
    )

    return recaptcha_req.json()


def validate_recaptcha_v2(recaptcha_token: str):
    res = validate_recaptcha(2, recaptcha_token)
    valid = res['success']
    if not valid:
        raise Exception(fail_msg)
    return valid


def validate_recaptcha_v3(recaptcha_token: str, expected_action: str = None):
    res = validate_recaptcha(3, recaptcha_token)
    valid = res['action'] == expected_action and res['success'] and res['score'] > 0.5
    if not valid:
        raise Exception(fail_msg)
    return valid
