[![Maintainability](https://api.codeclimate.com/v1/badges/ca151bfd1f418205b16f/maintainability)](https://codeclimate.com/repos/5efd1564422ade0162000fb2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/ca151bfd1f418205b16f/test_coverage)](https://codeclimate.com/repos/5efd1564422ade0162000fb2/test_coverage)
[![Netlify Status](https://api.netlify.com/api/v1/badges/bc6e158d-0a46-4bd6-ac6c-f3812dac4920/deploy-status)](https://app.netlify.com/sites/nostalgic-hawking-b45e37/deploys)

# FakeCheck Front-end (Web)

## Setup Procedures

1. Open [MingGW-64](https://sourceforge.net/projects/mingw-w64/) (Windows) or Terminal (macOS/Linux), or any equivalent command line interface
2. Clone or download this repository
3. Go to the root directory for this repository on your machine
4. Install the yarn dependency manager _if you haven't done so already_
   - Windows: download and run the [yarn installer](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
   - macOS/Linux: install [Homebrew](https://brew.sh/) and run `brew install yarn` on the command line interface
5. Run `yarn install` on the command line interface to install the [project dependencies](package.json)
6. Run `yarn start` on the command line interface to start your local server
7. Complete the setup procedures for the [fc-api](https://github.com/Sapphire-Labs/Hackathon/blob/master/fc-api/README.md) subproject
8. Go to [`http://localhost:3000`](http://localhost:3000) in your browser to access the development build

## GraphQL

IMPORTANT: The following instructions are only required for development, not for setup

In order to auto-generate the types for our GraphQL queries and mutations,

1. Run `yarn global add apollo --prefix /usr/local` to install apollo globally _if you haven't done so already_
2. Run `yarn gen:types` to trigger the Apollo Client codegen script

The type definitions are located in the [__generated__](./__generated__/) and [src/gql/__generated__](./src/gql/__generated__/) folders. You should _not_ manually change them.

## Compatibility

The website supports the following browsers:

- Chrome 80+
- Edge 80+
- Firefox 74+
- Opera 67+
- Safari 13.1+

## Infrastructure

There is a publicly accessible [infrastructure diagram](https://app.diagrams.net/#G1tL5VqGfF9K73nWqdyFTNIqNhhN7EQQF9) in the FakeCheck folder on Google Drive.

| Name                          | Usages                         | Person Responsible                        |
|-------------------------------|--------------------------------|-------------------------------------------|
| [AWS](https://aws.amazon.com/)  | file storage, CDN hosting                 | Jadon              |
| [Cloud Console](https://console.cloud.google.com/home/dashboard) | Google API & service configurations | Jadon |
| [EmailJS](https://www.emailjs.com/) | client-side email sender | Jadon |
| [Firebase](https://console.firebase.google.com/) | website analytics, third-party SSO | Jadon         |
| [Netlify](https://app.netlify.com/) | website hosting, continuous deployment | Jadon   |
| [reCAPTCHA Admin](https://www.google.com/recaptcha/admin) | reCAPTCHA configurations, reCAPTCHA analytics | Jadon |
| [Rollbar](https://rollbar.com/) | error tracking (production only)  | Jadon   |

## Environment Variables

The [environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables/) for this project are
stored in the following files:

- `.env` &ndash; global variables
- `.env.local` &ndash; local variables (`yarn start` and `yarn test` on local environment)
- `.env.development` &ndash; development-only variables (`yarn start`)
- `.env.test` &ndash; test-only variables (`yarn test`)
- `.env.production` &ndash; production-only variables (`yarn build`)

**You should _not_ store private API keys in environment variables as users can retrieve them by inspecting the app
files bundled with the build.**

These files should always be ignored by git (see [`.gitignore`](.gitignore)). You can contact Jadon for a copy of these
files. You need to restart the relevant react script when you change an environment variable. **Please inform Jadon
whenever you need to make changes to either `.env` or `.env.production` before the next production deployment.**

## Project Structure

This project is structured under the following directory tree. However, for brevity, it only provides a high-level overview, so some parts &mdash; as marked with ellipses (...) &mdash; of the actual tree are not shown.

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
│   │   └── paths.ts     # internal URL pathnames
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

The website uses [material design](https://material.io/design/foundation-overview/) as its design language. Many of the material-theme components come from the [Material-UI](https://material-ui.com/) library.

You should be particularly aware of the following UI guidelines:

- Use, for most components, sizes and spacings &mdash; including the width, height, margin and padding properties
  &mdash; in increments of 4dp (4px on web) for tighter or smaller components, and of 8dp (8px on web) otherwise
- Use dialogs sparingly, and only when they contain critical information or tasks for the users, and consider the use of
  a snackbar, toast, tooltip or popover instead as dialogs are purposefully interruptive
- Avoid hardcoding spacings, colours and screen width breakpoints and use the Material-UI utility functions (e.g.,
  `theme.spacing(...)`, `theme.palette.primary.main`, `theme.breakpoints...`) instead
- Prefer font sizes in `rem` over `px`; use `theme.typography.pxToRem(...)` for conversions
- Prefer the use of Material-UI [styling solution](https://material-ui.com/styles/basics/) &mdash; which utilizes JSS     syntax &mdash; over standard CSS
- Prefer the use of the Material-UI [colour palette](https://material-ui.com/customization/color/) over a hardcoded colour code

The default Material-UI theme configurations &mdash; including any global styles &mdash; can be found in the [theme.js](./src/styles/theme.ts) file. The default Material-UI spacing interval (8px) and font size (1rem = 14px) are used. The limited standard CSS styles can be found in the [styles](./src/styles/) folder, where the [universal.css](./src/styles/universal.css) file contains all the universal CSS styles.

As an aside, you may recall that most browsers default a native HTML button to `type="submit"`. However, Material-UI automatically defaults its Button component (`<Button {...props} />`) to `type="button"`.

## Code Styles

This project utilizes [Prettier](https://prettier.io/) to enforce certain
[styling rules](.pretterric.json). It will auto-format your code whenever you save that code.

This project uses [TypeScript](https://www.typescriptlang.org/), which is built on top of JavaScript, to enforce type
safety. You should always try to assign a variable to the most specific type possible whenever the TypeScript compiler
cannot unambiguously implicitly or explicitly deduce the type. You should avoid assignments to the `any` type where
possible, and should be careful with assignments to the `null` and `undefined` types.

You should also comply with the following naming rules:
| Usage                         | Rule                           | Examples                                  |
|-------------------------------|--------------------------------|-------------------------------------------|
| variables                     | camelCase                      | `var jadonFan = "Hello, World!";`         |
| global constants              | SCREAMING_SNAKE_CASE           | `const PI = 3.14`                         |
| enumerated constants          | SCREAMING_SNAKE_CASE           | `enum JadonMood { HAPPY_OPT, SAD_PES }`   |
| functions                     | PascalCase                     | `function getSomeNum() { return 21; }`    |
| classes                       | PascalCase                     | `class JadonFan extends UWaterlooStudent` |
| interfaces                    | PascalCase                     | `interface CardProps extends PaperProps`  |
| enumeration types             | PascalCase                     | `enum JadonMood { }`                      |
| React components              | PascalCase                     | `<TeamMemberCard />`                      |
| Redux actions and reducers    | camelCase                      | `supportReducers`                         |
| Redux action types            | SCREAMING_SNAKE_CASE           | `CHANGE_WEBSITE_LANGUAGE`                 |
| GraphQL mutations and queries | SCREAMING_SNAKE_CASE           | `LOGIN`                                   |
| JSX files                     | PascalCase                     | `TeamMemberCard.tsx`                      |
| non-JSX files                 | kebab-case                     | `awesome-jadon.ts`, `awesome-jadon.jpg`   |
| folders                       | kebab-case                     | `fact-check` folder                       |

## Error Handling

You can use a `try...catch...finally...` block to handle errors sent by the back-end. The custom `useAlert()` hook can be used to pass the corresponding error message as an alert to the user. Within a particular error message, you can likely find its ID between the `#@` and `@` symbols; if such symbols do exist, you can call the `parseGqlErrorMsg(errorMsg: string)` on the error message to retrieve its ID and then pass on that ID to the `intl.formatMessage()` function to obtain a localized and user-friendly version of the error message.

## Optimizations

You should attempt to include the following optimizations where possible (**not an exhaustive list**):

- Use [`<React.Fragment> ... </React.Fragment>`](https://reactjs.org/docs/fragments.html) (alternatively, if you don't 			need to pass in any keys or attributes, `<> ... </>`), which does not create an extra DOM node, whenever you _only_ need to wrap multiple child components under one parent component
- Use [`React.PureComponent`](https://reactjs.org/docs/react-api.html#reactcomponent) over `React.Component` for class
  components whenever the `render()` function renders the same result given the same props and state
- Wrap expensive calculations around a `React.useMemo` hook when they need only be computed when specific dependencies have changed
- Apply [code-splitting](https://reactjs.org/docs/code-splitting.html) techniques where approriate in order to reduce the bundle size

## Tests

You should use [Jest](https://jestjs.io/) and [Enzyme](https://enzymejs.github.io/enzyme/) to write automated tests on
the front-end. The test files should have an extension of `.test.[jt]sx?`.

## Prerendering

The website is rendered on the client-side, but is dynamically pre-rendered by prerender.io through a configuration on Netlify. This pre-render process enables the use of dynamic meta tags, and could potentially improve SEO.

## Accessibility (a11y)

The website should follow the
[W3C Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#normativedef)
because each and every person &mdash; regardless of their physical and mental abilities &mdash; is vulnerable to the
infodemic. To this end, you should consult the
[MDN Accessibility Tutorials](https://developer.mozilla.org/en-US/docs/Web/Accessibility) and keep in the mind the
following accessibility rules:

- Include concise but descriptive `alt` texts for all images
- Apply noticeable colour contrasts between different UI components
- Use heading elements (e.g., `h1`) for titles and subtitles where appropriate, in lieu of plain text
- Use HTML landmark elements (e.g., `main`, `aside`, `article`, `section`) where appropriate
- Apply [WAI-ARIA roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) on the relevant
  components **if the corresponding HTML landmark elements are not available**; landmark elements are preferred over
  elements with direct WAI-ARIA role assignments

## Internationalization (i18n) and Localization (l10n)

The website aims to support the fight against the infodemic in a wide range of countries and cultures around the world.
This project utilizes [react-intl](https://formatjs.io/docs/react-intl) to simplify the localization process of the website so that the website is more easily scalable.

You should never hardcode static text strings unless the text is guaranteed to not change across different locales (e.g., the website name "FakeCheck", emojis). Instead, you should store the text strings in the [messages.ts](/src/text/messages.ts) file under the corresponding locale; the object key ("id") of the text string should have an unique and relevant name. Then, you can use either the `FormattedMessage` component or the `intl.formatMessage()` function, and pass in the id. If you want to add a translation for the text string in a different locale, copy the id of the text string, paste it under the corresponding locale and modify the content of the text string accordingly.

You should also use react-intl to localize numbers, dates, times, relative times and plurals.

## Search Engine Optimization (SEO)

The website, which relies primarily on crowd-sourced data, is ultimately only effective when there exists at least an
aquedate amount of users who are willing to post their own reviews and comment on other people's reviews. To this end,
you should keep in mind the following SEO guidelines:

- Use the [Open Graph (OG)](https://ogp.me/) protocol to represent fact check ratings on OG-supported social media and   test the website against Facebook's [Sharing Debugger](https://developers.facebook.com/tools/debug/) and Twitter's [Card Validator](https://cards-dev.twitter.com/validator)
- Use `meta` tags (see [index.html](public/index.html)) with extra care as many of them either get ignored by modern
  search engines or _deoptimizes_ SEO capabilities
- Specify a canoncial link (`rel=canonical`) &mdash; generally the one that directs to the most important webpage &mdash; 	among **similar** webpages so that search engines show the most important content
- Specify a no-follow link (`rel=nofollow`) when you have a component that links to a
  third-party document (e.g., a fact-checked news article); the `noreferrer` and `nooppener` behaviours
  [do _not_ directly improve SEO](https://twitter.com/JohnMu/status/903510290024857600) but may be necessary for
  [security](#Security) purposes when the `target` attribute is set to `_blank`
- Do _not_ set the author of a linked webpage (`rel=author`) without first discussing it with Jason as many modern search 	engines only reference the first instance of `rel=author` and ignore the remaining ones

Any positive exposure is good exposure, other than when some Instagram influencer wants to buy your product but is too
cheap to pay for it with real money and instead offers to
[pay with exposure](https://www.reddit.com/r/ChoosingBeggars/).

You can use [Google Webmasters](https://www.google.ca/webmasters/#?modal_active=none) to track the website's search performance through the Search Console and to learn more about the different SEO techniques.

The website should predominantly display the fact check ratings of popular and trending topics.

## Security

The website should be
[secured against malicious users](https://imgflip.com/memetemplate/160235259/Alright-then-keep-your-secrets). To this
end, you should keep in mind the following security guidelines:

- Do _not_ store private API keys in environment variables as users can retrieve them by inspecting the app files
  bundled with the build
- Set the `rel` attribute to `noreferrer` and `nooppener` whenever the `target` attribute is set to `_blank`; otherwise,
  other pages may be able to redirect the user to a malicious site
- Store transitive private data, such as a JWT, in a cookie with a `HttpOnly` flag, which prevents XSS attacks, and with
  protection against CSRF attacks through, for example, a CSRF token
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

This project utilizes the following frameworks and libraries:

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
- Vertical Timeline Component &ndash; creates build one-/two- column vertical timeline components
- ChartJS &ndash; creates dynamic charts
- Anime.js &ndash; creates various animations
- Scroll Magic &ndash; creates scrolling animations
- date-fns &ndash; simplifies date formatting and parsing
- zxcvbn &ndash; measures password strength
- country-list &ndash; generates a list of country names and their ISO-3166 codes
- react-country-flag &ndash; creates the SVG and emoji versions of select country flags
- EmailJS &ndash; sends automated pre-formatted emails
- Jest &ndash; provides a framework for automated tests
- Enzyme &ndash; simplifies automated tests

Immutability is important in Redux and, in most cases, can be achieved with functional callback methods, such as `Array.prototype.map()` and `Array.prototype.reduce()`, and with the spread operator &mdash; that is, `...` &mdash; in ES6 or above. This project does _not_ use any special immutable libraries such as Immutable.js or Immer.

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
- html to JSX &ndash; converts plain HTML code to the corresponding JSX code
- Markdown All in One &ndash; provides markdown tools such as keyboard shortcuts, table of contents and auto preview

## Tools

The following tools are recommended for this project:

- React Developer Tools &ndash;
  [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) |
  [Firefox](https://addons.mozilla.org/en-CA/firefox/addon/react-devtools/) |
  [Edge](https://microsoftedge.microsoft.com/addons/detail/gpphkfbcpidddadnkolkpfckpihlkkil)
- Redux DevTools &ndash;
  [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) |
  [Firefox](https://addons.mozilla.org/en-CA/firefox/addon/reduxdevtools/)

## Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br /> Open [http://localhost:3000](http://localhost:3000) to view it in the
browser.

The page will reload if you make edits.<br /> You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br /> See the section about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles React in production mode and optimizes
the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## JavaScript Tricks

You can make use of the following JavaScript tricks as long as they don't significantly hinder the readability of
your code. They are supported by the browser versions compatible with the website (see section on [Compatibility](#Compatibility)).

#### [Object Property Value Shorthand](https://alligator.io/js/object-property-shorthand-es6/)

If you have key and value with the same name, assuming that the value is pulled from a JavaScript variable, inside a
JavaScript object, then you can just specify the key without the need to type in the value.

```javascript
const favColour = "blue";
const favPop = "diet coke";
const jadonFan = { favColour, favPop };
console.log(jadonFan); // { favColor: "blue", favPop: "diet coke" }
```

#### Dynamic Key Names

If you want the name of a key to be dynamic in a JavaScript object, then you can put angle brackets around a variable as
the key.

```javascript
const revealFavColour = true;
const jadonKey = revealFavColour ? "favColour" : "dislikeColour";
console.log({ [jadonKey]: "blue" }); // {favColour: "blue"}
```

#### Array Deconstruction

You can extract the elements in an `Array` and assign them to variables within a single statement. If you want to skip over an index in the array, you can simply add an extra comma in the assignment at that index.

```javascript
const chandlerLei = [1, 6, 15, 20, 15, 6, 1];
const [x, y, , z] = chandlerLei;
console.log(`${x} ${y} ${z}`); // 1 6 20
const [a, ...rest] = chandlerLei;
console.log(rest); // [6, 15, 20, 15, 6, 1]
```

#### Object Deconstruction

You can extract the key-value pairs in an `Object` and assign the keys to corresponding variables within a single statement. If you want to rename a particular key, you can create an alias for that key in the assignment.

```javascript
const jadonFan = { favColour: "blue", favPop: "diet coke", country: "Canada", music: "rock" };
const { favPop, country: c, hobby = "cooking", ...rest } = jadonFan;
console.log(`${favPop}, ${c}, ${hobby}, ${rest}, ${rest.music}`); // diet coke, Canada, cooking, [object Object], rock
```

#### [Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

You may be familiar with the safe call operator (`?.`) in Kotlin or the safe navigation operator (`&.`) in Ruby.
JavaScript provides a similiar operator called the optional chaining operator (`?.`). When the operand on the LHS of the
operator is nullish (that is, `null` or `undefined`), then the rest of the code statement does not get executed and
`undefined` is returned instead.

```javascript
const favColour = "blue";
const jadonFan = { favColour };
console.log(jadonFan.programming?.favLang); // undefined
```

#### [Nullish Coalescing Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)

You may be familiar with the Elvis operator (`?:`) in Kotlin or the null-coalescing operator (`??`) in C#. JavaScript
provides a similiar operator called the nullish coalescing operator (`??`). When the operand on the LHS of the operator is
nullish (that is, `null` or `undefined`), then the operand on the RHS is returned instead.

```javascript
const favColour = null ?? "blue";
console.log(favColour); // blue
```

#### Array Type Conversion

You can convert all the elements in an array to a different type with a simple call to the `Array.prototype.map()` function.

```javascript
const jadonFan = [1, 1, 2, 3, 5, 8].map(String);
console.log(jadonFan); // ["1", "1", "2", "3", "5", "8"]
const chandlerLei = ["", 2, 0, "hello", [], null, undefined, new Object()].map(Boolean);
console.log(chandlerLei.map(Boolean)); // [false, true, false, true, true, false, false, false]
```

#### [Comma Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator)

You can use the comma operator to evaluate each operation from left to right and return the result of the rightmost
operation.

```javascript
let jadonAwesomeness = 99;
jadonAwesomeness = (++jadonAwesomeness, jadonAwesomeness);
console.log(jadonAwesomeness); // 100
```

#### Switch Statements with Non-Discrete Conditions

Like languages such as Kotlin and Ruby, but unlike languages such as Java and C++ (Python be like, "what's a switch-case
statement anyways?"), you can use a switch statement in JavaScript with non-discrete conditions, such as a range of
numbers. However, I don't know why you'd use this over an if-elseif-else statement.

```javascript
const jadonAwesomeness = 100;
let response = "";
switch (true) {
  case jadonAwesomeness <= 0:
    response = "just terrible...";
    break;
  case 0 < jadonAwesomeness && 100 > jadonAwesomeness:
    response = "I guess?";
    break;
  case jadonAwesomeness === 100:
  default:
    response = "I knew it!";
    break;
}
console.log(response); // I knew it!
```

#### [Generator Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*)

It's not really a trick per se, but it's still cool. It exists in some other languages such as Python. You can use
`function*` to declare a generator function, use `yield` to stop and save the results of the generator function for the
next iteration and call `next` on the generator function to continue with the generator function until either the next
`yield` statement or the end of the function is reached. Similarly, you can use `async function*` to declare an
asynchronous generator function.

```javascript
function* generateJadonCompliment() {
  console.log("Jadon");
  yield "Fan";
  console.log("is");
  yield "Awesome";
}
const jadonFan = generateJadonCompliment();
console.log(jadonFan.next().value); // stops immediately after yield "Fan"
console.log(jadonFan.next().value); // stops immediately after yield "Awesome"
console.log(jadonFan.next().value); // end of function, returns yield
// Jadon
// Fan
// is
// Awesome
```
