from datetime import datetime
from ..base_reference import BaseReference
from ..reference_utils import ReferenceUtils


class AcmReference(BaseReference):
    name = "ACM"
    __max_authors_count = 3

    def __init__(self, url: str, title: str, author: str, publication_date: datetime):
        def on_each_author(name, idx):
            parts = name.split(" ")
            parts_count = len(parts)
            if parts_count == 0:
                return ""
            elif parts_count == 1:
                return parts[0]
            elif parts_count == 2:
                return f"{parts[0]} {parts[1]}"
            else:
                author = parts[0]
                for part in parts[1:-1]:
                    author += f" {part[0].upper()}."
                author += f" {parts[-1]}"
                return author

        self.url = url

        self.title = title

        self.authors = ReferenceUtils.separate_authors(
            author, on_each_author, self.__max_authors_count)
        if len(self.authors) > self.__max_authors_count:
            self.authors = [self.authors[0], self.authors[-1]]

        self.pub_dt = "n.d"
        if publication_date:
            self.pub_dt = publication_date.strftime("%b %d, %Y")

    def reference_website(self):
        return self.fill_citation_template(
            "[{}] {}. {}. {}. Retrieved from {}.",
            reference_number="",
            author=ReferenceUtils.join_separated_authors(
                self.authors, " and "),
            website_year=self.pub_dt,
            title=self.title,
            url=self.url
        )
