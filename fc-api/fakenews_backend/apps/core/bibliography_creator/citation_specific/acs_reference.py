from datetime import datetime
from ..base_reference import BaseReference
from ..reference_utils import ReferenceUtils


class AcsReference(BaseReference):
    name = "ACS"

    def __init__(self, url: str, title: str, author: str, publication_date: datetime):
        def on_each_author(name, idx):
            return ReferenceUtils.format_last_name_initialize_others(name)

        self.url = url

        self.title = title

        self.authors = ReferenceUtils.separate_authors(author, on_each_author)

        # self.pub_dt = ""
        # if publication_date:
        #     self.pub_dt = publication_date.strftime("%Y")

    def reference_website(self):
        return self.fill_citation_template(
            "{} {}. {} (accessed {}).",
            author=ReferenceUtils.join_separated_authors(
                self.authors, "; ", "; "),
            title=self.title,
            url=self.url,
            access_date=datetime.now().strftime("%B %d, %Y")
        )
