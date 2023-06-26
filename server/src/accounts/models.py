from django.db import models
from django.core.validators import MinLengthValidator,ProhibitNullCharactersValidator
from django.contrib.auth.validators import ASCIIUsernameValidator
from accounts.managers import MyUserManager
# Create your models here.


username_validator = ASCIIUsernameValidator()

class MyUser(models.Model):
    username = models.CharField(
        unique=True,
        max_length=20,
        blank=False,
        null=False,
        validators=[MinLengthValidator(5),ProhibitNullCharactersValidator,username_validator],
        error_messages={
            'unique':("A user with that username already exists")
        }
        )
    email = models.EmailField(
        unique=True,
        max_length=254,
        null=False,
        blank=False,
        error_messages={
            'unique':("A user with that email already exists")
        }
    )

    password = models.CharField(
        max_length=128,
        blank=False,
        null = False,
        validators=[MinLengthValidator(8)],
        )
    is_active = True
    is_staff = models.BooleanField(default=False)
    is_anonymous = False
    is_authenticated = True
    USERNAME_FIELD = 'email'
    objects = MyUserManager()
    REQUIRED_FIELDS = []
    def __str__(self) -> str:
        return self.username
    