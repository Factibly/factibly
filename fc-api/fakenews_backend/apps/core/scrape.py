from newspaper import Article


def scrape_article(content):
    # TODO: We need a way to differentiate between different types of media!!!
    article = Article(content.url)
    article.download()
    article.parse()

    content.title = article.title
    content.publication_date = article.publish_date

    # We should consider adding an Author Object into our DB so that users
    # can find articles from a particular author and help them determine if
    # that user is reliable

    content.author = ', '.join(article.authors)

    # TODO: get the image and do something with it
    # I would say download and upload to s2, then populate
    # content image link with it

    content.image_url = article.top_image
    content.save()

    # If we wanted to use the library for keywords

    # article.nlp()
    # article.keywords
