from datetime import datetime
from ..base_reference import BaseReference
from ..reference_utils import ReferenceUtils


class IeeeReference(BaseReference):
    name = "IEEE"
    __max_authors_count = 3

    def __init__(self, url: str, title: str, author: str, publication_date: datetime):
        def on_each_author(name, idx):
            if idx == self.__max_authors_count:
                return "et. al."
            elif idx < self.__max_authors_count:
                parts = name.split(" ")
                author = ""
                for part in parts[:-1]:
                    if part:
                        author += f"{part[0].upper()}."
                author += f" {parts[-1]}"
                return author.lstrip()

        self.url = url

        self.title = title

        self.authors = ReferenceUtils.separate_authors(
            author, on_each_author, self.__max_authors_count)
        if len(self.authors) > self.__max_authors_count:
            self.authors = [self.authors[0], self.authors[-1]]

        self.pub_dt = ""
        if publication_date:
            self.pub_dt = publication_date.strftime("%Y")

    def reference_website(self):
        return self.fill_citation_template(
            "[{}] {}, <i>{}</i>, {}, {}. Accessed on: {}. [Online]. Available: {}",
            reference_number="",
            author=ReferenceUtils.join_separated_authors(
                self.authors, " and "),
            title=self.title,
            publisher="",
            publication_date=self.pub_dt,
            access_date=datetime.now().strftime("%b %d, %Y"),
            url=self.url
        )
