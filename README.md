# The FakeCheck Project

## Local Setup

The setup instructions for each of our apps are available in their respective READMEs. You can _either_ follow those instructions (recommended) _or_ run our custom bash [script](./fc-internal/setup.sh). For more information on the latter option, you should read the [Setup Script](#setup-script).

The [fc-api](./fc-api/) directory contains the necessary back-end code for **all** our applications. You _must_ set that up.

**Regardless of which setup method you employ, you'll need to configure the environment variables in order to run our apps.** You can issue a request for these variables via an email to Jadon at [jdsare@gmail.com](mailto:jdsare@gmail.com) .

## Applications

| App  | Directory | URL     |
| ---------- | ---------- | ---------- |
| Main Website  | [fc-web](./fc-web/) |  https://fake-news-b45e37.netlify.app/ |
| Monday Marketplace App | [fc-monday](./fc-monday/) | _Coming Soon_ |
| Back-end | [fc-api](./fc-api/) | _Not Applicable_ |
| Internal | [fc-internal](./fc-internal/) | _Not Applicable_ |

## Resources 

| Resource   | URL     |
| ---------- | ------- |
| Wireframes  |  https://www.figma.com/file/5yWNhxAPTHPdrHd0U5X2QEFakeCheck-High-Fidelity-Wireframes-v1?node-id=0%3A1 |
| UX Flow Diagram | https://miro.com/app/board/o9J_kpJ4dHw=/ |
| ERD | https://app.lucidchart.com/invitations/accept/527e1e63-d836-49d4-8b2e-c389c2294a27 |
| Infrastructure Diagram | https://drive.google.com/file/d/1tL5VqGfF9K73nWqdyFTNIqNhhN7EQQF9/view?usp=sharing |

## Setup Script

Before you run our custom bash [script](./fc-internal/setup.sh), you may need to first run `chmod +x ./setup.sh` on the shell. You can then run `./setup.sh -h` for further help with running the script.