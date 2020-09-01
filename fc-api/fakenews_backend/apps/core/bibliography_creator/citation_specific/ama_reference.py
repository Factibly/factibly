from datetime import datetime
from ..base_reference import BaseReference
from ..reference_utils import ReferenceUtils


class AmaReference(BaseReference):
    name = "AMA"
    __max_authors_count = 6

    def __init__(self, url: str, title: str, author: str, publication_date: datetime):
        def on_each_author(name, idx):
            if idx == self.__max_authors_count:
                return "et. al."
            else:
                return ReferenceUtils.format_last_name_initialize_others(name)

        self.url = url

        self.title = title

        self.authors = ReferenceUtils.separate_authors(
            author, on_each_author, self.__max_authors_count)
        if len(self.authors) > self.__max_authors_count:
            self.authors = [self.authors[0], self.authors[1],
                            self.authors[2], self.authors[-1]]

        self.pub_dt = ""
        if publication_date:
            self.pub_dt = publication_date.strftime("%B %d, %Y")

    def reference_website(self):
        return self.fill_citation_template(
            "{} {}. {} website. {}. Accessed {}. {}",
            author=ReferenceUtils.join_separated_authors(self.authors, ", "),
            title=self.title,
            website_name="",
            published_date=self.pub_dt,
            accessed_date=datetime.now().strftime("%B %d, %Y"),
            url=self.url
        )
