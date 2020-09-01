# Factibly Monday

## Setup Procedures

1. Complete the setup procedures for the [fc-web](https://github.com/Sapphire-Labs/Hackathon/blob/master/FE/README.md) and the [fc-api](https://github.com/Sapphire-Labs/Hackathon/blob/master/BE/README.md) subprojects
2. Open [MingGW-64](https://sourceforge.net/projects/mingw-w64/) (Windows) or Terminal (macOS/Linux), or any equivalent command line interface
3. Clone or download this repository
4. Go to the root directory for this repository on your machine
5. Install the npm dependency manager
6. Run `npm install` to install the [project dependencies](package.json)
7. Run `npm run start`
8. Open monday.com and login to your account
9. Select your avatar on the left navigation bar, open the "Developers" section and select the "Factibly" app
10. Open the "Features" section and select the "Fact Check Analyzer" feature
11. Go to the [ngrok dashboard](http://localhost:4040/status) in your browser and under "command_line section" find the URL (this is the public URL of the app\*).
12. Open the "View setup" tab back in monday.com and paste the URL into the "Custom URL" field
13. Click the "Boards" button and choose one of the boards with some data in it
14. Click the "Preview" button

\* ngrok exposes the local web server to the internet

## Monday SDK

The application retrieves and manipulates data from Monday boards through the [Monday SDK](https://monday.com/developers/apps/intro).

## Release

1. Run `npm run build`
2. Zip your "./build" folder
3. Open the "Build" tab in your Feature
4. Click the "New Build" button
5. Click the "Upload" radio button and upload zip file with your build
6. Go to any board and add your just released view

## User Interface (UI) Design

This project uses a [material design](https://material.io/design/foundation-overview/). You should be particularly aware
of the following UI guidelines:

- Use, for most components, sizes and spacings &mdash; including the width, height, margin and padding properties
  &mdash; in increments of 4dp (4px on web) for tighter or smaller components, and of 8dp (8px on web) otherwise
- Use dialogs sparingly, and only when they contain critical information or tasks for the users, and consider    the use of
  a snackbar, toast, tooltip or popover instead as dialogs are purposefully interruptive

## Code Styles

This project utilizes [Prettier](https://prettier.io/) to enforce certain
[styling rules](.pretterric.json). It will auto-format your code whenever you save that code.

You should also comply with the following naming rules:
| Usage                         | Rule                           | Examples                                  |
|-------------------------------|--------------------------------|-------------------------------------------|
| globals                       | SCREAMING_SNAKE_CASE           | `const PI_MATHS = 3.14`                   |
| variables                     | camelCase                      | `var jadonFan = "Hello, World!";`         |
| functions                     | camelCase                      | `function getSomeNum() { return 21; }`    |
| classes                       | PascalCase                     | `class JadonFan extends UWaterlooStudent` |
| React components              | PascalCase                     | `<TeamMemberCard />`                      |
| JSX files                     | PascalCase                     | `TeamMemberCard.tsx`                      |
| non-JSX files                 | kebab-case                     | `awesome-jadon.ts`, `awesome-jadon.jpg`   |
| folders                       | kebab-case                     | `fact-check` folder                       |

## Tests

You should use [Jest](https://jestjs.io/) and [Enzyme](https://enzymejs.github.io/enzyme/) to write automated tests on
the front-end. The test files should have an extension of `.test.[jt]sx?`.

## Frameworks and Libraries

This project utilizes the following frameworks and libraries:

- React &ndash; simplifies front-end development
- Material-UI &ndash; creates material-themed UI components and icons
- Apollo Client &ndash; handles GraphQL mutations and queries
- Apollo Upload Client &ndash; handles file mutations and queries under the GraphQL multi-part request spec
- react-intl &ndash; simplifies internationalization
- Lodash &ndash; provides some common utility functions
- DOMPurify &ndash; sanitizes HTML, MathML and SVG code against potential XSS attacks

## VSCode Extensions

When you open this project directly on VSCode, the IDE recommends some useful extensions for you based on the
[extensions.json](.vscode/extensions.json) file. You can install these extensions via the VSCode Marketplace. You can
add your own recommendations, but please update the list below if you do so.

The following VSCode extensions are recommended for this project:

- GitLens &ndash; further integrates git in the IDE
- Live Share &ndash; shares your edits in real-time with other people (useful for pair programming)
- npm Intellisense &ndash; autocompletes the names of node modules in `import` statements
- Path Intellisense &ndash; autocompletes filenames of the local project files
- Prettier &ndash; formats your code
- ESLint &ndash; enforces JavaScript code styles
- Bracket Pair Colorizer &ndash; matches brackets by user-defined colour
- Auto Rename Tag &ndash; automatically renames the ending tags of paired HTML, XML and JSX tags
- html to JSX &ndash; converts plain HTML code to the corresponding JSX code
- Markdown All in One &ndash; provides markdown tools such as keyboard shortcuts, table of contents and auto preview
