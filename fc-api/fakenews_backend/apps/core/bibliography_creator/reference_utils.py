class ReferenceUtils():
    @staticmethod
    def separate_authors(author, on_each_author=lambda name, idx: name, limit=999):
        if author is None:
            return ""

        authors = []
        for idx, name in enumerate(author.split(",")):
            if idx <= limit:
                authors.append(on_each_author(name.strip(), idx))

        return authors

    @staticmethod
    def join_separated_authors(authors, last=" & ", joiner=", "):
        authors_count = len(authors)
        if authors_count == 0 or not authors[0]:
            return ""
        elif authors_count == 1:
            return joiner.join(authors)
        else:
            return joiner.join(authors[:-1]) + last + authors[-1]

    @staticmethod
    def wrap_in_highlight(text):
        return "<input placeholder=\"%s\">" % text

    @staticmethod
    def format_last_name_initialize_others(name, include_period=True):
        parts = name.split(" ")[::-1]
        author = parts[0]
        if len(parts) > 1:
            author += ", "
            for part in parts[1:]:
                author += part[0].upper()
                if include_period:
                    author += "."
        return author

    @staticmethod
    def format_last_first_name_flip(name):
        parts = name.split(" ")[::-1]
        author = parts[0]
        if len(parts) > 1:
            author += ", " + " ".join(parts[1:])
        return author
