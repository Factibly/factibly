[![Maintainability](https://api.codeclimate.com/v1/badges/97d1a684ce9148b3c2b2/maintainability)](https://codeclimate.com/repos/5efd15773789a301760000f7/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/97d1a684ce9148b3c2b2/test_coverage)](https://codeclimate.com/repos/5efd15773789a301760000f7/test_coverage)

# FakeCheck Back-end

## Setup Guide
1. Clone the repo

## Start Up Instructions
### Docker

2. Download Docker Desktop and start it
3. In root of repo, run ```docker-compose up```. This container contains the postgres db instance and you will have to keep it open.*

### Backend

4. Open the repo in a new terminal tab
5. Make sure Python 3.7 is installed on your machine ```python3 --version```
6. Run ```export PIPENV_VENV_IN_PROJECT="enabled"```
7. Run ```pipenv install```
8. Run ```pipenv shell``` to open virtual env*
9. Start the server with ```./manage.py runserver```

*Virtual env and docker container must be active during development

If `psycopg2` fails to install on step 7, run:

```shell
> brew reinstall openssl &&
  export LIBRARY_PATH=$LIBRARY_PATH:/usr/local/opt/openssl/lib &&
  export LDFLAGS="-L/usr/local/opt/openssl/lib" &&
  export CPPFLAGS="-I/usr/local/opt/openssl/include"
> pip3 install psycopg2-binary
> pipenv install
```

## Database

This project utilizes [PostgreSQL](https://www.postgresql.org/) for its database. You can use any PostgreSQL client, but we recommend [Postico](https://eggerapps.at/postico/).

## Tests

You should use the default [Django testing framework](https://docs.djangoproject.com/en/3.0/topics/testing/), which is built on top of Python's `unittest` module, to write automated tests on the back-end.

## String Representations

You should consider overriding the `__str__(self)` method in your models and have them return readable strings *where possible*. There may be some cases where you probably should _not_ override this magic method, such as when a model has no concise, unique _and_ readable identifier. However, in cases where such override is beneficial, you should be able to easily distinguish between every model object when you run the `objects.all()` on a particular model.

You can use your own judgement as to when you should assign a `verbose_name` to your model fields and classes, and `verbose_name_plural` to the latter.

## Code Styles

This project utilizes [Pylint](https://pypi.org/project/pylint/), along with its [Django extension](https://pypi.org/project/pylint-django/), to enforce styling rules. Your code should be "pythonic"; if you are not familiar with Python coding conventions, you can refer to [The Hitchhiker's Guide to Python (Code Styles)](https://docs.python-guide.org/writing/style/).

You should also comply with the following naming rules:

- Use snake_case for naming variables, functions, Python files and folders (e.g., `chandler_score`, `def compliment_chandler()`, `chandler_info.py`)
- Use PascalCase for naming classes (e.g., `ChandlerType`)

The ternary operator (`<expression> if <condition> else <expression>`) is arguably also "unpythonic" and, in this project, should be avoided.

Formatted string literals ("f-strings") are _generally_ preferred over the `str.format()` method and placeholder strings (`str % sub`), but all three are acceptable.

## Frameworks and Packages

This project utilizes the following frameworks and packages:

- Django &ndash; simplifies back-end development
- Graphene &ndash; builds GraphQL schemas and types
- psycopg2 &ndash; connects the application with the PostgreSQL databases
- django-graphql-jwt &ndash; authenticates user sessions via JSON Web Tokens
- django-cors-headers &ndash; adds CORS headers to responses
- Django Extensions &ndash; provides, amongst other extensions, some useful tools in the `manage.py` script
- django-fsm &ndash; builds finite state machines

## VSCode Extensions

When you open this project directly on VSCode, the IDE recommends some useful extensions for you based on the
[`extensions.json`](.vscode/extensions.json) file. You can install these extensions via the VSCode Marketplace. You can
add your own recommendations, but please update the list below if you do so.

The following VSCode extensions are recommended for this project:

- GitLens &ndash; further integrates git in the IDE
- Live Share &ndash; shares your edits in real-time with other people (useful for pair programming)
- MagicPython &ndash; highlights Python syntax
- Python Docstring Generator &ndash; generates Python docstrings
