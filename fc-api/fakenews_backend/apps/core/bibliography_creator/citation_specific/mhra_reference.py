from datetime import datetime
from ..base_reference import BaseReference
from ..reference_utils import ReferenceUtils


class MhraReference(BaseReference):
    name = "MHRA"
    __max_authors_count = 3

    def __init__(self, url: str, title: str, author: str, publication_date: datetime):
        def on_each_author(name, idx):
            if idx == self.__max_authors_count:
                return "others"
            else:
                return ReferenceUtils.format_last_first_name_flip(name)

        self.url = url

        self.title = title

        self.authors = ReferenceUtils.separate_authors(
            author, on_each_author, self.__max_authors_count)
        if len(self.authors) > self.__max_authors_count:
            authors = [self.authors[0], self.authors[-1]]

        self.pub_dt = ""
        if publication_date:
            self.pub_dt = publication_date.strftime("%Y")

    def reference_website(self):
        return self.fill_citation_template(
            "{}, <i>{}</i> ({}) &lt;{}&gt; [Accessed {}]",
            author=ReferenceUtils.join_separated_authors(
                self.authors, " and ", ", "),
            title=self.title,
            publication_year=self.pub_dt,
            url=self.url,
            accessed_date=datetime.now().strftime("%B %d, %Y")
        )
