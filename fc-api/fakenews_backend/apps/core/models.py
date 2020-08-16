from django.db import models
from django.core.validators import MaxValueValidator
from django.core.validators import MinValueValidator


class MediaType(models.TextChoices):
    """
    Enum type of media content we support
    """
    RADIO = 'RD', 'Radio'
    GRAPHIC = 'GP', 'Graphic'
    FORUM = 'FR', 'Forum'
    GAME = 'GM', ' Game'
    SOCIAL_MEDIA = 'SM', 'Social_Media'
    VIDEO = 'VD', 'Video'
    BLOG = 'BG', 'Blog'
    DIGITAL_ARTICLE = 'DA', 'Digial_Article'
    BOOK = 'BK', 'Book'
    PDF = 'PF', 'PDF'
    ACADEMIC_STUDY = 'AS', 'Academic_Study'
    OTHER = 'OT', 'Other'


class ImageModerationScore(models.IntegerChoices):
    SAFE = 0
    WARNING = 1
    NO_SHOW = 2


class Content(models.Model):
    """
    Content model that contains a piece of media
    """
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    url = models.TextField(max_length=2000, unique=True)
    search_count = models.IntegerField(default=0)
    score = models.FloatField(default=0.0)

    title = models.CharField(max_length=255, null=True)
    author = models.CharField(max_length=255, null=True)
    publication_date = models.DateField(null=True)
    image_url = models.URLField(max_length=2000, null=True)

    image_moderation_score = models.IntegerField(
        choices=ImageModerationScore.choices,
        default=ImageModerationScore.SAFE
    )

    # Every media content should be classified under a media type
    media_type = models.CharField(
        max_length=2,
        choices=MediaType.choices,
        default=MediaType.DIGITAL_ARTICLE,
    )

    def overall_rating(self):
        ratings_set = self.rating_set.all()

        if not ratings_set:
            return 0.0

        ratings = [r.overall_score() for r in ratings_set]
        return sum(ratings)/len(ratings)


class Rating(models.Model):
    """
    Rating model for a single rating on a piece of content
    """
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    content = models.ForeignKey(Content, on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    justification = models.TextField(null=True)
    country = models.CharField(max_length=255, null=True)

    # A score is represented as a float with min value of 0.0 with max value of 5.0
    score1 = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],
        default=0.0
    )

    score2 = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],
        default=0.0
    )
    score3 = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],
        default=0.0
    )

    # A upvote or downvote count is specified by an integer
    upvote_count = models.IntegerField(default=0)
    downvote_count = models.IntegerField(default=0)

    def overall_score(self):
        return (self.score1 + self.score2 + self.score3)/3
