from .models import ImageModerationScore

import base64
import requests
import os

import boto3
from botocore.config import Config


config = Config(region_name="ca-central-1")


def get_as_base64(url):
    return base64.b64encode(requests.get(url).content)


def moderate_image(image, no_show_labels=()):
    no_show_labels += ('Nudity', 'Graphic Male Nudity',
                       'Graphic Female Nudity')

    client = boto3.client('rekognition', config=config)

    try:
        response = client.detect_moderation_labels(
            Image=image
        )
    except:
        return ImageModerationScore.SAFE

    score = ImageModerationScore.SAFE
    for label in response['ModerationLabels']:
        if label['Name'] in no_show_labels:
            score = ImageModerationScore.NO_SHOW
            break
        else:
            score = ImageModerationScore.WARNING

    return score


def moderate_image_url(url, no_show_labels=()):
    image = {'Bytes': base64.decodebytes(get_as_base64(url))}
    return moderate_image(image, no_show_labels)


def moderate_image_s3(filename, no_show_labels=()):
    image = {
        'S3Object': {
            'Bucket': os.environ['AWS_STORAGE_BUCKET_NAME'],
            'Name': filename
        }
    }
    return moderate_image(image, no_show_labels)
