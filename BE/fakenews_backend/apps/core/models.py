from django.db import models
from fakenews_backend.apps.users.models import User


class Content(models.Model):
    url = models.TextField(max_length=2000, unique=True)
    search_count = models.IntegerField(default=1)
    score = models.FloatField(default=0.0)

    title = models.CharField(max_length=255, null=True)
    author = models.CharField(max_length=255, null=True)
    publication_date = models.DateField(null=True)


class Rating(models.Model):
    content = models.ForeignKey(Content, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    justification = models.TextField(null=True)
    country = models.CharField(max_length=255, null=True)

    # can be an enum, but int for now, easier to calc score
    score = models.IntegerField()
