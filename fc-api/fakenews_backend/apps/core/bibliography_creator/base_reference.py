from abc import ABC, abstractmethod
from datetime import datetime
from .reference_utils import ReferenceUtils


class BaseReference(ABC):
    @abstractmethod
    def __init__(self, url: str, title: str, author: str,
                 publication_date: datetime):
        pass

    # thanks PEP468 (https://docs.python.org/3/whatsnew/3.6.html#whatsnew36-pep468)
    @classmethod
    def fill_citation_template(cls, template: str, **kwargs):
        fields = []
        for key, value in kwargs.items():
            if value:
                fields.append(value)
            else:
                fields.append(ReferenceUtils.wrap_in_highlight(key))
        return template.format(*fields)

    @property
    @abstractmethod
    def name(self) -> str: ...

    @abstractmethod
    def reference_website(self) -> str: ...
