from datetime import datetime
from ..base_reference import BaseReference
from ..reference_utils import ReferenceUtils


class BibtexReference(BaseReference):
    name = "BibTeX"

    def __init__(self, url: str, title: str, author: str, publication_date: datetime):
        def on_each_author(name, idx):
            return ReferenceUtils.format_last_name_initialize_others(name)

        self.url = url

        self.title = title

        self.authors = ReferenceUtils.separate_authors(author, on_each_author)

        self.pub_dt = ""
        if publication_date:
            self.pub_dt = publication_date.strftime("%Y")

        self.identifier = ""
        if title:
            self.identifier = title.replace(" ", "")[:10].lower()

    def reference_website(self):
        return self.fill_citation_template(
            """
                @misc( {},<br>
                &emsp;author = \"{}\",<br>
                &emsp;title = \"{}\",<br>
                &emsp;year = \"{}\",<br>
                &emsp;url = \"{}\",<br>
                &emsp;note = \"[Online; accessed {}]\"<br>
                )
            """,
            identifier=self.identifier,
            author=ReferenceUtils.join_separated_authors(
                self.authors, " and ", "and "),
            title=self.title,
            publication_year=self.pub_dt,
            url=self.url,
            date_viewed=datetime.now().strftime("%d %B %Y"),
        )
