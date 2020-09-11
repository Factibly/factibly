[![Maintainability](https://api.codeclimate.com/v1/badges/ca151bfd1f418205b16f/maintainability)](https://codeclimate.com/repos/5efd1564422ade0162000fb2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ca151bfd1f418205b16f/test_coverage)](https://codeclimate.com/repos/5efd1564422ade0162000fb2/test_coverage)
[![Netlify Status](https://api.netlify.com/api/v1/badges/bc6e158d-0a46-4bd6-ac6c-f3812dac4920/deploy-status)](https://app.netlify.com/sites/nostalgic-hawking-b45e37/deploys)

# factibly.com

## Setup Procedures

1. Open [MingGW-64](https://sourceforge.net/projects/mingw-w64/) (Windows) or Terminal (macOS/Linux), or any equivalent command line interface
2. Clone or download this repository
3. Go to the root directory for this repository on your machine
4. Install the yarn dependency manager _if you haven't done so already_
   - Windows: download and run the [yarn installer](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
   - macOS/Linux: install [Homebrew](https://brew.sh/) and run `brew install yarn` on the command line interface
5. Run `yarn install` on the command line interface to install the [project dependencies](package.json)
6. Run `yarn start` on the command line interface to start your local server
7. Complete the setup procedures for the [fc-api](https://github.com/Sapphire-Labs/factibly/blob/master/fc-api/README.md) subproject
8. Go to [`http://localhost:3000`](http://localhost:3000) in your browser to access the development build

## GraphQL

IMPORTANT: The following instructions are only required for development, not for setup

In order to auto-generate the types for our GraphQL queries and mutations,

1. Run `yarn global add apollo --prefix /usr/local` to install apollo globally _if you haven't done so already_
2. Go to the root directory for this repository on your machine
3. Run `yarn gen:types` to execute the Apollo Codegen script

The type definitions are located in the [\_\_generated__](./__generated__/) and [src/gql/\_\_generated__](./src/gql/__generated__/) folders. You should _not_ manually change them.

## Compatibility

The website supports the following browsers:

- Chrome 80+
- Edge 80+
- Firefox 74+
- Opera 67+
- Safari 13.1+

## Infrastructure

There is a publicly accessible [infrastructure diagram](https://app.diagrams.net/#G1tL5VqGfF9K73nWqdyFTNIqNhhN7EQQF9) in the Factibly folder on Google Drive.

| Service                         | Usages                         | Person Responsible                        |
|-------------------------------|--------------------------------|-------------------------------------------|
| [AWS](https://aws.amazon.com/)  | file storage, CDN hosting                 | Jadon              |
| [Cloud Console](https://console.cloud.google.com/home/dashboard) | Google API & service configurations | Jadon |
| [EmailJS](https://www.emailjs.com/) | client-side email sender | Jadon |
| [Firebase](https://console.firebase.google.com/) | website analytics, third-party SSO | Jadon         |
| [Netlify](https://app.netlify.com/) | website hosting, continuous deployment | Jadon   |
| [reCAPTCHA Admin](https://www.google.com/recaptcha/admin) | reCAPTCHA configurations, reCAPTCHA analytics | Jadon |
| [Rollbar](https://rollbar.com/) | error tracking (production only)  | Jadon   |

## Environment Variables

The environment variables are initialized in the following files on the root directory:

- `.env` &ndash; global variables
- `.env.local` &ndash; local variables (`yarn start` and `yarn test` on local environment)
- `.env.development` &ndash; development-only variables (`yarn start`)
- `.env.test` &ndash; test-only variables (`yarn test`)
- `.env.production` &ndash; production-only variables (`yarn build`)

These files are ignored by git (see [.gitignore](.gitignore)). You can contact Jadon for a copy of these
files. You need to restart the relevant react script when you change an environment variable. **Please inform Jadon
whenever you need to make changes to either `.env` or `.env.production` before the next production deployment.**

## Project Structure

The repository is structured under the following directory tree.

```bash
├── .github              # github workflow and action configurations
│   └── ...
├── .vscode
│   ├── extensions.json  # recommended extensions from the VSCode Marketplace
│   └── settings.json    # default VSCode settings
├── public
│   ├── images           # static image files, preferably in .jpg or .png format
│   │   └── ...
│   ├── _redirects       # Netlify redirect configurations
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt       # search engine crawler configurations
├── src
│   ├── common           # more generic and (mostly) presentational React components
│   │   └── ...
│   ├── extensions       # component wrappers for app extensions
│   │   └── ...
│   ├── gql              # Apollo client configurations, and GraphQL mutations and queries
│   │   └── ...
│   ├── hooks            # global hooks
│   │   └── ...
│   ├── libs             # third-party library configurations
│   │   └── ...
│   ├── screens          # presentational and container React components
│   │   └── ...
│   ├── static
│   │   ├── data         # general static data
│   │   │   └── ...
│   │   ├── keys         # key names
│   │   │   └── ...
│   │   ├── messages     # localized messages
│   │   │   └── ...
│   │   │── enums.ts     # global TypeScript enums
│   │   │── locales.ts   # locale configurations and data
│   │   │── mui-base.ts  # default Material-UI translations
│   │   └── paths.ts     # internal URL paths
│   ├── store            # Redux store with actions and reducers
│   │   └── ...
│   ├── styles           # CSS files, global colours and themes
│   │   └── ...
│   ├── utils            # general utility functions
│   │   └── ...
│   └── ...
└── ...
```

## User Interface (UI) Design

The website uses [material design](https://material.io/design/foundation-overview/) as its design language. Many of the material components come from the [Material-UI](https://material-ui.com/) library.

You should be particularly aware of the following UI guidelines:

- Use, for most components, sizes and spacings &mdash; including the width, height, margin and padding properties
  &mdash; in increments of 4dp (4px on web) for tighter or smaller components, and of 8dp (8px on web) otherwise
- Use dialogs sparingly, and only when they contain critical information or tasks for the users, and consider the use of
  a snack bar, toast, tooltip or popover instead as dialogs are purposefully interruptive
- Avoid hardcoding spacings, colours and screen width breakpoints and use the Material-UI utility functions (e.g.,
  `theme.spacing(...)`, `theme.palette.primary.main`, `theme.breakpoints...`) instead
- Prefer font sizes in `rem` over `px`; use `theme.typography.pxToRem(...)` for conversions
- Prefer the use of Material-UI [styling solution](https://material-ui.com/styles/basics/) &mdash; which utilizes JSS     syntax &mdash; over standard CSS
- Prefer the use of the Material-UI [colour palette](https://material-ui.com/customization/color/) over hardcoded colour codes

The default Material-UI theme configurations &mdash; including any global styles &mdash; can be found in the [theme.ts](./src/styles/theme.ts) file. The default Material-UI spacing interval (8px) and font size (1rem = 14px) are used. The limited standard CSS styles can be found in the [styles](./src/styles/) folder, where the [universal.css](./src/styles/universal.css) file contains all the universal CSS styles.

As an aside, you may recall that most browsers default a native HTML button to `type="submit"`. However, Material-UI automatically defaults its Button component (`<Button {...props} />`) to `type="button"`.

## Code Styles

We utilize [Prettier](https://prettier.io/) to enforce certain
[styling rules](.pretterric.json). It will auto-format your code whenever you save that code.

We also have integrated Code Climate to determine potential improvements in the code quality and reduce our technical debt. It will automatically analyze any changes that you push onto a branch that has an open PR with the `dev` branch as the destination branch. Our Code Climate configurations can be found in the (.codeclimate.yml)(.codeclimate.yml) file.

We use [TypeScript](https://www.typescriptlang.org/) to enforce type safety. You should always try to assign a variable to the most specific type possible whenever the TypeScript compiler cannot unambiguously implicitly or explicitly deduce the type. You should avoid assignments to the `any` type where possible, and should be careful with assignments to the `null` and `undefined` types.

You should also comply with the following naming conventions:

| Type                         | Rule                           | Examples                                  |
|-------------------------------|--------------------------------|-------------------------------------------|
| globals                       | SCREAMING_SNAKE_CASE           | `const PI_MATHS = 3.14`                   |
| variables                     | camelCase                      | `var jadonFan = "Hello, World!";`         |
| functions                     | camelCase                      | `function getSomeNum() { return 21; }`    |
| classes                       | PascalCase                     | `class JadonFan extends UWaterlooStudent` |
| interfaces                    | PascalCase                     | `interface CardProps extends PaperProps`  |
| type definitions              | PascalCase                     | `type JadonFan = string & int`            |
| enum types                    | PascalCase                     | `enum JadonMood { }`                      |
| enum members                  | SCREAMING_SNAKE_CASE           | `enum JadonMood { HAPPY_OPT, SAD_PES }`   |
| React components              | PascalCase                     | `<TeamMemberCard />`                      |
| JSX files                     | PascalCase                     | `TeamMemberCard.tsx`                      |
| non-JSX files                 | kebab-case                     | `awesome-jadon.ts`, `awesome-jadon.jpg`   |
| folders                       | kebab-case                     | `fact-check` folder                       |

## Error Handling

You can use a `try {...} catch {...} finally {...}` block to handle errors sent by the back-end. The custom `useAlert()` hook can be used to pass the corresponding error message as an alert to the user. Within a particular error message, you can likely find its ID between the `#@` and `@` symbols; if such symbols do exist, you can call the `parseGqlErrorMsg(errorMsg: string)` on the error message to retrieve its ID and then pass on that ID to the `intl.formatMessage()` function to obtain a localized and user-friendly version of the error message.

## Optimizations

You should attempt to include the following optimizations where possible (**not an exhaustive list**):

- Use [`<React.Fragment> ... </React.Fragment>`](https://reactjs.org/docs/fragments.html) (alternatively, if you don't 			need to pass in any keys or attributes, `<> ... </>`), which does not create an extra DOM node, whenever you _only_ need to wrap multiple child components under one parent component
- Use [`React.PureComponent`](https://reactjs.org/docs/react-api.html#reactcomponent) over `React.Component` for class
  components whenever the `render()` function renders the same result given the same props and state; likewise, wrap function components inside `React.memo(...)` for the same reason.
- Wrap expensive calculations inside a `React.useMemo(...)` hook when they need only be computed when specific dependencies have changed
- Apply [code-splitting](https://reactjs.org/docs/code-splitting.html) techniques where appropriate in order to reduce the bundle size

## Tests

We use [Jest](https://jestjs.io/) and [Enzyme](https://enzymejs.github.io/enzyme/) to create automated
tests. The test files should have an extension of `.test.[jt]sx?`.

## Prerendering

The website is rendered on the client-side, but is dynamically pre-rendered by prerender.io through a configuration on Netlify. This pre-render process enables the use of dynamic meta tags, and could potentially improve SEO.

## Accessibility (a11y)

The website should confirm with the W3C Web Content Accessibility Guidelines at Level AA, [WCAG 2.1 AA](https://www.w3.org/TR/WCAG21/), because each and every person &mdash; regardless of their physical and mental abilities &mdash; is vulnerable to the infodemic. To this end, you should consult the [MDN Accessibility Tutorials](https://developer.mozilla.org/en-US/docs/Web/Accessibility).

You can use the Accessibility and Rendering tabs in the Chrome DevTools to simulate and monitor accessibility features. You can also whocanuse.com to simulate the appearance different colour combinations for various types of vision.

## Internationalization (i18n) and Localization (l10n)

The website aims to support the fight against the infodemic in a wide range of countries and cultures around the world.
We utilize [react-intl](https://formatjs.io/docs/react-intl) to simplify the localization process of the website so that the website is more easily scalable.

You should never hardcode static text strings unless the text is guaranteed to not change across different locales (e.g., the website name "Factibly", emojis). Instead, you should store the text strings in the [messages.ts](/src/static/messages/messages.ts) file under the corresponding locale; the object key ("message ID") of the text string should have an unique and relevant name. Then, you can use either the `FormattedMessage` component or the `intl.formatMessage()` function, and pass in the message ID. If you want to add a translation for the text string in a different locale, copy the id of the text string, paste it under the corresponding locale and modify the content of the text string accordingly.

You should also use react-intl to localize numbers, dates, times, relative times and plurals.

## Search Engine Optimization (SEO)

The website, which relies primarily on crowd-sourced data, is ultimately only effective when there exists at least an
aquedate amount of users who are willing to post their own reviews and comment on other people's reviews.

- Use the [Open Graph (OG)](https://ogp.me/) protocol to represent fact check ratings on OG-supported social media and test the website against Facebook's [Sharing Debugger](https://developers.facebook.com/tools/debug/) and Twitter's [Card Validator](https://cards-dev.twitter.com/validator)
- Use `meta` tags (see [index.html](public/index.html)) with extra care as many of them either get ignored by modern search engines or _deoptimizes_ SEO capabilities
- Specify a canoncial link (`rel=canonical`) &mdash; generally the one that directs to the most important webpage &mdash; among **similar** webpages so that search engines show the most important content
- Do _not_ set the author of a linked webpage (`rel=author`) without first discussing it with Jason as many modern search engines only reference the first instance of `rel=author` and ignore the remaining ones

You can use [Google Webmasters](https://www.google.ca/webmasters/#?modal_active=none) to track the website's search performance through the Search Console and to learn more about the different SEO techniques.

The website should predominantly display the fact check ratings of popular and trending topics.

## Security

The website should be
[secured against malicious users](https://imgflip.com/memetemplate/160235259/Alright-then-keep-your-secrets).

- Do _not_ store private API keys in environment variables as users can retrieve them by inspecting the app files bundled with the build
- Set the `rel` attribute to `noreferrer` and `nooppener` whenever the `target` attribute is set to `_blank`; otherwise, other pages may be able to redirect the user to a malicious site
- Store transitive private data, such as a JWT, in a cookie with a `HttpOnly` flag, which prevents XSS attacks, and with protection against CSRF attacks through, for example, a CSRF token
- Do _not_ store sensitive user information, such as their account password, in `sessionStorage` or `localStorage` as 		 	 other sites can access `sessionStorage` and `localStorage` data through a XSS attack

## Gender-Inclusive Language

The website is open to everyone regardless of their sex or social gender. As a reflection of this openness, the website
should use gender-inclusive language where possible and avoid asking users about their gender when it's not necessary.
You can consult the following guidelines, and use the following tools, if you are unsure of what constitutes as gendered
language and how to convert gendered language into gender-inclusive language:

- English &ndash; [UNC-CH Guidelines](https://writingcenter.unc.edu/tips-and-tools/gender-inclusive-language/) |
  [Gender Neutral Text Converter](https://jewang.github.io/gender-neutral-text-converter/)
- Chinese &ndash; [UN Guidelines](https://www.un.org/zh/gender-inclusive-language/guidelines.shtml)

## Frameworks and Libraries

We utilize the following frameworks and libraries:

- React &ndash; simplifies front-end development
- Redux &ndash; provides a predictable state container
- Redux Thunk &ndash; provides a middleware to dispatch asynchronous actions and resolve promises
- Material-UI &ndash; creates material-themed UI components and icons
- Material-UI Pickers &ndash; creates material-themed date and time pickers
- Apollo Client &ndash; handles GraphQL mutations and queries
- Apollo Upload Client &ndash; handles file mutations and queries under the GraphQL multi-part request spec
- React Router &ndash; routes webpages
- history &ndash; manages session history universally in the app
- react-intl &ndash; simplifies internationalization
- Lodash &ndash; provides some common utility functions
- DOMPurify &ndash; sanitizes HTML, MathML and SVG code against potential XSS attacks
- React Helmet &ndash; manages changes to the HTML document head
- react-device-detect &ndash; detects the user's device type, OS, mobile vendor, browser/engine and user agent
- Formik &ndash; builds dynamic forms
- React Dropzone &ndash; creates a file drag n' drop component
- React Avatar Editor &ndash; creates a component for editing the scale, rotation, etc. of an image
- Vertical Timeline Component &ndash; creates one-/two- column vertical timeline components
- ChartJS &ndash; creates dynamic charts
- Anime.js &ndash; creates various animations
- date-fns &ndash; simplifies date formatting and parsing
- zxcvbn &ndash; measures password strength
- country-list &ndash; generates a list of country names and their ISO-3166 codes
- react-country-flag &ndash; creates the SVG and emoji versions of select country flags
- EmailJS &ndash; sends automated pre-formatted emails on the client side
- Asana &ndash; serves as the client library for Asana APIs
- Jest &ndash; provides a framework for automated tests
- Enzyme &ndash; simplifies automated tests

Immutability is important in Redux and, in most cases, can be achieved with functional callback methods, such as `Array.prototype.map()` and `Array.prototype.reduce()`, and with the spread operator &mdash; that is, `...` &mdash; in ES6 or above. We do _not_ use any special immutable libraries such as Immutable.js or Immer.

[Dependabot](https://dependabot.com/) automatically detects any updates to the project dependencies; when it does, it
creates a PR that modifies the [package.json](package.json) file accordingly and that merges onto the default branch.
You should _either_ occassionally run `yarn install` _or_ install [npm-merge-driver](https://www.npmjs.com/package/npm-merge-driver) with a yarn configuration to get these updates. **You should never manually modify the [yarn.lock](yarn.lock) file.**

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
- Markdown All in One &ndash; provides markdown tools such as keyboard shortcuts, table of contents and auto preview
- Code Spell Checker &ndash; checks your code for spelling errors
- ES7 React/Redux/GraphQL/React-Native snippets &ndash; provides snippets for some commonly used code blocks

## Development Tools

The following development tools are recommended for this project:

- React Developer Tools &ndash;
  [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) |
  [Firefox](https://addons.mozilla.org/en-CA/firefox/addon/react-devtools/) |
  [Edge](https://microsoftedge.microsoft.com/addons/detail/gpphkfbcpidddadnkolkpfckpihlkkil)
- Redux DevTools &ndash;
  [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) |
  [Firefox](https://addons.mozilla.org/en-CA/firefox/addon/reduxdevtools/)
