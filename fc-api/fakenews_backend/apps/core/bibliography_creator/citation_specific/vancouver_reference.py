from datetime import datetime
from ..base_reference import BaseReference
from ..reference_utils import ReferenceUtils
from .....common.utils.date_utils import get_day_suffix


class VancouverReference(BaseReference):
    name = "Vancouver"

    def __init__(self, url: str, title: str, author: str, publication_date: datetime):
        def on_each_author(name, idx):
            return ReferenceUtils.format_last_name_initialize_others(name)

        self.url = url

        self.title = title

        self.authors = ReferenceUtils.separate_authors(author, on_each_author)

    def reference_website(self):
        now = datetime.now()

        return self.fill_citation_template(
            "{} <i>{}</i>. Available from: {} [Accessed {}].",
            author=ReferenceUtils.join_separated_authors(self.authors, ", "),
            title=self.title,
            url=self.url,
            date_of_access=now.strftime(f"%d{get_day_suffix(now.day)} %B %Y")
        )
