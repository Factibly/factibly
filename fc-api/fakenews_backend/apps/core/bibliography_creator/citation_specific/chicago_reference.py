from datetime import datetime
from ..base_reference import BaseReference
from ..reference_utils import ReferenceUtils


class ChicagoReference(BaseReference):
    name = "Chicago"
    __max_authors_count = 6

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

        if publication_date:
            self.date_type = "Last modified"
            self.pub_dt = publication_date.strftime("%B %d, %Y")
        else:
            self.date_type = "Accessed"
            self.pub_dt = datetime.now().strftime("%B %d, %Y")

    def reference_website(self):
        last_on_author = " and "
        if len(self.authors) > self.__max_authors_count:
            last_on_author = ", "

        return self.fill_citation_template(
            "{}. \"{}\". {} {}. {}.",
            author=ReferenceUtils.join_separated_authors(
                self.authors, last_on_author),
            title=self.title,
            date_type=self.date_type,
            publication_date=self.pub_dt,
            url=self.url
        )
