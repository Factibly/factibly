from datetime import datetime
from ..base_reference import BaseReference
from ..reference_utils import ReferenceUtils


class MlaReference(BaseReference):
    name = "MLA"
    __max_authors_count = 2

    def __init__(self, url: str, title: str, author: str, publication_date: datetime):
        def on_each_author(name, idx):
            if idx == self.__max_authors_count:
                return "et. al."
            elif 1 <= idx <= self.__max_authors_count - 1:
                return name
            elif idx == 0:
                return ReferenceUtils.format_last_first_name_flip(name)

        self.url = url

        self.title = title

        self.authors = ReferenceUtils.separate_authors(
            author, on_each_author, self.__max_authors_count)

        self.pub_dt = ""
        if publication_date:
            self.pub_dt = publication_date.strftime("%d %b %Y")

    def reference_website(self):
        last_on_author = ", "
        if len(self.authors) == self.__max_authors_count:
            last_on_author = " and "

        return self.fill_citation_template(
            "{}. \"{}\". {}, {}. Accessed {}.",
            author=ReferenceUtils.join_separated_authors(
                self.authors, last_on_author),
            title=self.title,
            publisher="",
            publication_date=self.pub_dt,
            accessed_date=datetime.now().strftime("%d %b %Y")
        )
