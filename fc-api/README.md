[![Maintainability](https://api.codeclimate.com/v1/badges/97d1a684ce9148b3c2b2/maintainability)](https://codeclimate.com/repos/5efd15773789a301760000f7/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/97d1a684ce9148b3c2b2/test_coverage)](https://codeclimate.com/repos/5efd15773789a301760000f7/test_coverage)

# FakeCheck Back-end

## Setup Procedures

1. Open [MingGW-64](https://sourceforge.net/projects/mingw-w64/) (Windows) or Terminal (macOS/Linux), or any equivalent command line interface
2. Clone or download this repository
3. Go to the root directory for this repository on your machine
4. Download [Docker Desktop](https://www.docker.com/products/docker-desktop) and start it
5. Run `docker-compose up` to start the postgres DB instance
6. Repeat steps 1 and 2 in a new tab/window of your command line interface
7. Run `python3 --version` and check that [Python 3.7](https://www.python.org/downloads/) is installed on your machine; if not, install it.
8. Run `export PIPENV_VENV_IN_PROJECT="enabled"`
9. Run `pipenv install` to install the [project dependencies](Pipfile)\*
10. Run `pipenv shell` to open the virtual environment\*\*
11. Run `./manage.py runserver` to start the server

\* If `psycopg2` fails to install, run:

```shell
> brew reinstall openssl &&
  export LIBRARY_PATH=$LIBRARY_PATH:/usr/local/opt/openssl/lib &&
  export LDFLAGS="-L/usr/local/opt/openssl/lib" &&
  export CPPFLAGS="-I/usr/local/opt/openssl/include"
> pip3 install psycopg2-binary
> pipenv install
```

\*\* The virtual environment and docker container must both be active

## Database

This project utilizes [PostgreSQL](https://www.postgresql.org/) for its database. You can use any PostgreSQL client, but we recommend [Postico](https://eggerapps.at/postico/).

## Infrastructure

There is a publicly accessible [infrastructure diagram](https://app.diagrams.net/#G1tL5VqGfF9K73nWqdyFTNIqNhhN7EQQF9) in the FakeCheck folder on Google Drive.

| Name                                                             | Usages                                        | Person Responsible |
| ---------------------------------------------------------------- | --------------------------------------------- | ------------------ |
| [AWS](https://aws.amazon.com/)                                   | file storage, CDN hosting                     | Jadon              |
| [Cloud Console](https://console.cloud.google.com/home/dashboard) | Google API & service configurations           | Jadon              |
| [Heroku](https://dashboard.heroku.com/)                          | back-end hosting, continuous deployment       | Chandler           |
| [reCAPTCHA Admin](https://www.google.com/recaptcha/admin)        | reCAPTCHA configurations, reCAPTCHA analytics | Jadon              |
| [Rollbar](https://rollbar.com/)                                  | error tracking (production only)              | Jadon              |

## Tests

You should use the default [Django testing framework](https://docs.djangoproject.com/en/3.0/topics/testing/), which is built on top of Python's `unittest` module, to write automated tests on the back-end.

## Stringification

You should consider overriding the `__str__(self)` method in your models and have them return readable strings _where possible_. There may be some cases where you probably should _not_ override this magic method, such as when a model has no concise, unique _and_ readable identifier. However, in cases where such an override is beneficial, you should be able to easily distinguish between every model object when you run the `objects.all()` on a particular model.

You can use your own judgement as to when you should assign a `verbose_name` to your model fields and classes, and `verbose_name_plural` to the latter.

## Code Styles

This project utilizes [Pylint](https://pypi.org/project/pylint/), along with its [Django extension](https://pypi.org/project/pylint-django/), to enforce styling rules. Your code should be "pythonic"; if you are not familiar with Python coding conventions, you can refer to the [_Hitchhiker's Guide to Python_](https://docs.python-guide.org/writing/style/).

You should also comply with the following naming rules:

| Usage        | Rule                 | Examples                             |
| ------------ | -------------------- | ------------------------------------ |
| variables    | snake_case           | `chandler_score: int = 5`            |
| functions    | snake_case           | `def rate_chandler -> int : pass`    |
| classes      | PascalCase           | `class ChandlerLei(UWStudent): pass` |
| enum members | SCREAMING_SNAKE_CASE | `class QianMood(Enum): HAPPY_OPT`    |
| files        | snake_case           | `chandler_info.py`                   |
| folders      | snake_case           | `fact_check` folder                  |

The ternary operator (`<expression> if <condition> else <expression>`) is arguably also "unpythonic" and, in this project, should be avoided _unless_ the condition and expressions are short and simple.

Formatted string literals ("f-strings") are _generally_ preferred over the `str.format()` method and placeholder strings (`str % sub`), but all three are acceptable.

## Frameworks and Packages

This project utilizes the following frameworks and packages:

- Django &ndash; simplifies back-end development
- Graphene &ndash; builds GraphQL schemas and types
- psycopg2 &ndash; connects the application with the PostgreSQL databases
- django-graphql-jwt &ndash; authenticates user sessions via JSON Web Tokens
- django-cors-headers &ndash; injects CORS headers to responses
- Django Extensions &ndash; provides, amongst other extensions, some useful tools in the `manage.py` script
- django-fsm &ndash; builds finite state machines
- newspaper3k &ndash; scraps website metadata and content
- boto3 &ndash; provides the AWS SDK
- django-storages &ndash; handles uploads and retrievals of files from Amazon S3 buckets
- graphene-file-upload &ndash; handles file mutations and queries under the GraphQL multi-part request spec

## VSCode Extensions

When you open this project directly on VSCode, the IDE recommends some useful extensions for you based on the
[extensions.json](.vscode/extensions.json) file. You can install these extensions via the VSCode Marketplace. You can add your own recommendations, but please update the list below if you do so.

The following VSCode extensions are recommended for this project:

- GitLens &ndash; further integrates git in the IDE
- Live Share &ndash; shares your edits in real-time with other people (useful for pair programming)
- MagicPython &ndash; highlights Python syntax
- Python Docstring Generator &ndash; generates Python docstrings
