from django.core.exceptions import ValidationError
import re


class UpperCaseValidator:
    def __init__(self, min_up_count=1):
        self.min_up_count = min_up_count

    def validate(self, password, user=None):
        if not re.match(".*[A-Z].*" * self.min_up_count, password):
            raise ValidationError(
                ("This password must contain at least %(min_up_count)d characters."),
                code='password_missing_upper_case',
                params={'min_up_count': self.min_up_count},
            )

    def get_help_text(self):
        return f"Your password must contain at least {self.min_up_count} uppercase letter"


class NumericalValidator:
    def __init__(self, min_digits=1):
        self.min_digits = min_digits

    def validate(self, password, user=None):
        if not re.match(".*[1-9].*" * self.min_digits, password):
            raise ValidationError(
                ("This password must contain at least %(min_digits)d characters."),
                code='password_missing_digits',
                params={'min_digits': self.min_digits},
            )

    def get_help_text(self):
        return f"Your password must contain at least {self.min_digits} digits."
