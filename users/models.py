from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)


class User(AbstractBaseUser):
  email = models.EmailField(
      verbose_name='email address',
      max_length=255,
      unique=True,
  )
  is_admin = models.BooleanField(default=False)

  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)
  date_of_birth = models.DateField()

  reliability = models.FloatField()
  country = models.CharField(max_length=255)

  first_name = models.CharField(max_length=255)
  last_name = models.CharField(max_length=255)

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['date_of_birth', 'first_name', 'last_name']




