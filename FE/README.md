## Onboarding Procedures

On the command line interface (CLI),

1. Clone this repo and go to the corresponding project directory on your local machine
2. Install a dependency manager called yarn
   - Windows: download and open the [yarn installer](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
   - macOS/Linux: install [Homebrew](https://brew.sh/) and run `brew install yarn`
3. Run `yarn install` to install the project dependencies specified in [`package.json`](package.json)
4. Run `yarn start` and go to [`http://localhost:3000`](http://localhost:3000) on your browser to access the development
   build

## Firebase

This project utilizes [Firebase](https://console.firebase.google.com/) for website analytics and, in the future,
potentially for authentication and performance monitoring. You should have received an invitation to the Firebase
project through your Google account. If you have any questions regarding Firebase, you should contact Jadon.

## Environment Variables

The [environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables/) for this project are
stored in the following files:

- `.env` &ndash; global variables
- `.env.development` &ndash; development-only variables (loaded on `yarn start`)
- `.env.test` &ndash; test-only variables (loaded on `yarn test`)
- `.env.production` &ndash; production-only variables (loaded on `yarn build`)

**You should _not_ store private API keys in environment variables as users can retrieve them by inspecting the app
files bundled with the build.**

The more narrowly scoped environment variables take precendence (e.g., if an environment variable is stored in both
`.env` and `.env.development`, then the value in the latter overwrites the value in the former).

These files should always be ignored by git (see [`.gitignore`](.gitignore)). You can contact Jadon for a copy of these
files. You need to restart the relevant react script when you change an environment variable. **Please inform Jadon
whenever you need to make changes to either `.env` or `.env.production` before the next production deployment.**

## User Interface (UI) Design

This project uses a [material design](https://material.io/design/foundation-overview/). You should be particularly aware
of the following UI guidelines:

- Use, for most components, sizes and spacings &mdash; including the width, height, margin and padding properties
  &mdash; in increments of 4dp (4px on web) for tighter or smaller components, and of 8dp (8px on web) otherwise
- Use dialogs sparingly, and only when they contain critical information or tasks for the users, and consider the use of
  a snackbar instead as dialogs are purposefully interruptive

## Code Styles

This project utilizes [Prettier](https://prettier.io/) to enforce the styling rules specified in the
[`.prettierrc`](.pretterric) file. It will auto-format your code whenever you save that code.

This project uses [TypeScript](https://www.typescriptlang.org/), which is built on top of JavaScript, to enforce type
safety. You should always try to assign a variable to the most specific type possible whenever the TypeScript compiler
cannot unambiguously implicitly or explicitly deduce the type. You should avoid assignments to the `any` type where
possible, and should be careful with assignments to the `null` and `undefined` types.

You should also comply with the following naming rules:

- Use at least one verb and one noun for naming non-component functions (e.g., `function handleEvent() {}` where
  "handle" is the verb and "Event" is the noun)
- Use camelCase for naming variables and functions (e.g., `const jadonFan;`, `function complimentJadonFan() {}`)
- Use PascalCase for naming classes and TypeScript interfaces (e.g., `class JadonFan extends UWaterlooStudent`,
  `interface AppProps extends WrappedComponementProps<"intl">`)
- Use PascalCase for naming React Components _and_ their corresponding files (e.g., `TeamMemberCard` instead of
  `teamMemberCard`, `TeamMemberCard.tsx` instead of `teamMemberCard.tsx`)
- Use kebab-case for naming project folders and other files (e.g., `awesome-jadon-fan.ts`, folder `fact-check`)

As an aside, although not really a styling rule, it's important that you remember the difference between
[`Array.prototype.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
and
[`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) in
JavaScript when you want to render a bunch of repeated React components. Otherwise, you might occasionally end up like
Jadon :eyes:. The `forEach()` method does _not_ return anything whereas the `map()` method returns whatever you want it
to return. If you are knowledgeable in Java 8 or above, you may recall that its
[`Stream`](https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html) API contains the `forEach()`
and `map()` methods, which have similar behaviours. If you need to iterate over an iterable, such as `Array` or
`Object`, to render multiple React components, you should be calling `map()`!

## Optimizations

You should attempt to include the following optimizations where possible: (**not an exhaustive list**)

- Use [`<React.Fragment> ... </>`](https://reactjs.org/docs/fragments.html) (alternatively, if you don't need to pass in
  any keys or attributes, `<> ... </>`), which do not create an extra DOM node, instead of spamming `div` elements
  whenever you simply need to wrap multiple child components under one parent component and don't need any special
  properties of a `div` element
- Use [`React.PureComponent`](https://reactjs.org/docs/react-api.html#reactcomponent) over `React.Component` for class
  components whenever the `render()` function renders the same result given the same props and state

## Tests

You should use [Jest](https://jestjs.io/) to write automated tests on the front-end.

## Accessibility (a11y)

The website should follow
[W3C Web Content Accessibility Guidelines (WCAG) 2.0](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#normativedef)
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
  `div` elements with WAI-ARIA roles

## Internationalization (i18n)

The website aims to support the fight against the infodemic in a wide range of countries and cultures around the world.
This project utilizes [`react-intl`](https://formatjs.io/docs/react-intl), which is a part of
[Format.JS](https://formatjs.io/), to simplify the internationalization process of the website so that the website
becomes more easily scalable.

You should never hardcode static text strings unless the text is a name of a person, or guaranteed to not change across
languages (e.g., the website name "FakeCheck", emojis). Instead, you should store the text strings in the
[messages.ts](/src/text/messages.ts) file under the corresponding language; the JSON key ("id") of the text string
should have an unique and relevant name. Then, you can use either the `FormattedMessage` component or
`useIntl().formatMessage()` function (note that extra steps may be required), and pass in the id. If you want to add a
translation for the text string in a different language, copy the id of the text string, paste it under the
corresponding language and change the content of the text string accordingly. Otherwise, you can choose to either not
copy the id or not put an empty string under the other languages, in which case Format.JS will automatically use the id
as the value of the text string.

You should also use `react-intl` to internationalize numbers, dates, times, relative times and plurals.

## Search Engine Optimization (SEO)

The website, which relies primarily on crowd-sourced data, is ultimately only effective when there exists at least an
aquedate amount of users who are willing to post their own reviews and comment on other people's reviews. To this end,
you should keep in mind the following SEO guidelines:

- Use `meta` tags (see [index.html](public/index.html)) with extra care as many of them either get ignored by modern
  search engines or _deoptimizes_ SEO capabilities
- Do _not_ use a `rel` attribute with a value of `author` without notifying Jadon as many modern search engines only
  reference the first instance of `rel="author"` and ignore the remaining ones
- Set the `rel` attribute to `nofollow` on top of any other relevant values when you have a component that links to a
  third-party document (e.g., a fact-checked news article); the `noreferrer` and `nooppener` behaviours
  [do _not_ directly improve SEO](https://twitter.com/JohnMu/status/903510290024857600) but may be necessary for
  security purposes when the `target` attribute is set to `_blank` (see the section on [Security](#Security))

Any positive exposure is good exposure, other than when some Instagram influencer wants to buy your product but is too
cheap to pay for it with real money and instead offers to
[pay with exposure](https://www.reddit.com/r/ChoosingBeggars/).

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
- Do _not_ store sensitive user information, such as their account password, in `localStorage` as other sites can access
  the `localStorage` data through a XSS attack

## Gender-Inclusive Language

The website is open to everyone regardless of their sex or social gender. As a reflection of this openness, the website
should use gender-inclusive language where possible and avoid asking users about their gender when it's not necessary.
You can consult the following guidelines, and use the following tools, if you are unsure of what constitutes as gendered
language and how to turn genered language into gender-inclusive language:

- English &ndash; [UNC-CH Guidelines](https://writingcenter.unc.edu/tips-and-tools/gender-inclusive-language/) |
  [Gender Neutral Text Converter](https://jewang.github.io/gender-neutral-text-converter/)
- Chinese &ndash; [UN Guidelines](https://www.un.org/zh/gender-inclusive-language/guidelines.shtml)

## Frameworks and Libraries

This project utilizes the following frameworks and libraries:

- React &ndash; simplifies front-end development
- Redux &ndash; provides a predictable state container
- Material UI &ndash; provides material themed UI components
- Apollo &ndash; handles GraphQL mutations and queries
- Format.JS &ndash; simplifies i18n
- Formik &ndash; builds dynamic forms
- Anime.js &ndash; creates various animations
- Scroll Magic &ndash; creates scrolling animations

Immutability is important in Redux and, in most cases, can be achieved with functional callback methods, such as `map`
and `reduce`, and with the spread operator &mdash; that is, `...` &mdash; in ES6 or above. This project currently does
_not_ use any special immutable libraries such as Immutable.js or Immer.

[Dependabot](https://dependabot.com/) automatically detects any updates to the project dependencies; when it does, it
creates a PR that modifies the the [`package.json`](package.json) file accordingly and that merges onto the base branch.
You should occassionally run `yarn install` to get these updates. **You should never manually modify the
[`yarn.lock`](yarn.lock) file.**

## VSCode Extensions

When you open the project directly on VSCode, the IDE recommends some useful extensions for you based on the
[`extensions.json`](.vscode/extensions.json) file. You can install these extensions via the VSCode Marketplace. You can
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

You can make use of the following tricks in JavaScript as long as they don't significantly hinder the readability of
your code.<br /> Disclaimer: Jadon isn't responsible for any incorrect or misleading examples

#### [Object Property Value Shorthand](https://alligator.io/js/object-property-shorthand-es6/)

If you have key and value with the same name, assuming that the value is pulled from a JavaScript variable, inside a
JavaScript object, then you can just specify the key without the need to type in the value.

```javascript
const favColour = "blue";
const favPop = "diet coke";
const jadonFan = { favColour, favPop };
console.log(jadonFan); // { favColor: "blue", favPop: "diet coke" }
```

#### Dynamic Key Name

If you want to the key name to be dynamic in a JavaScript object, then you can put angle brackets around a variable as
the key.

```javascript
const revealFavColour = true;
const jadonKey = revealFavColour ? "favColour" : "dislikeColour";
console.log({ [jadonKey]: "blue" }); // { favColour: "blue"}
```

#### Array and Object Deconstruction

You can extract the elements of an array and assign them to variables in one statement. If you want to skip over an
array element, you can simply add an extra comma in the assignment. Likewise, you can extract the key-value pairs and
assign them to variables in one statement. In the latter case, you can also create an alias for the extracted key.

```javascript
const chandlerLei = [1, 6, 15, 20, 15, 6, 1];
const [x, y, , z] = chandlerLei;
console.log(`${x} ${y} ${z}`); // 1 6 20
const [a, ...rest] = chanderLei;
console.log(rest); // [6, 15, 20, 15, 6, 1]
const jadonFan = { favColour: "blue", favPop: "diet coke", country: "Canada" };
const { favPop, country: c, hobby = "cooking" } = jadonFan;
console.log(`${favPop} ${c} ${hobby}`); // diet coke Canada cooking
```

#### [Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

You may be familiar with the safe call operator (`?.`) in Kotlin or the safe navigation operator (`&.`) in Ruby.
JavaScript provides a similiar operator called the optional chaining operator (`?.`). When the value on the LHS of the
operator is nullish (that is, `null` or `undefined`), then the rest of the code statement does not get executed and
`undefined` is returned instead.

```javascript
const favColour = "blue";
const jadonFan = { favColour };
console.log(jadonFan.programming?.favLang); // undefined
```

#### [Nullish Coalescing Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)

You may be familiar with the Elvis operator (`?:`) in Kotlin or the null-coalescing operator (`??`) in C#. JavaScript
provides a similiar operator called the nullish coalescing operator (`??`). When the value on the LHS of the operator is
nullish (that is, `null` or `undefined`), then the value on the RHS is returned instead.

```javascript
const favColour = null ?? "blue";
console.log(favColour); // blue
```

#### Array Type Conversion

You can convert all the elements in an array to a different type with a simple call to the `map` function.

```javascript
const jadonFan = [1, 1, 2, 3, 5, 8].map(String);
console.log(jadonFan); // ["1", "1", "2", "3", "5", "8"]
const chandlerLei = ["", 2, 0, "hello", [], null, undefined, new Object()].map(Boolean);
console.log(chandlerLei.map(Boolean)); // [false, true, false, true, true, false, false, false]
```

#### Comma Operator

You can use the comma operator to evaluate each operation from left to right and the return the result of the rightmost
operation.

```javascript
let jadonAwesomeness = 100;
jadonAwesomeness = (--jadonAwesomeness, jadonAwesomeness);
console.log(jadonAwesomeness); // 99
```

#### Switch Statements with Non-Discrete Conditions

Like languages such as Kotlin and Ruby, but unlike languages such as Java and C++ (Python be like, "what's a switch-case
statement anyways?"), you can "use" a switch statement in JavaScript with non-discrete conditions, such as a range of
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
console.log(jadonFan.next().value); // stops immediately after `yield "Fan";`
console.log(jadonFan.next().value); // stops immediately after `yield "Awesome";`
console.log(jadonFan.next().value); // end of function, returns yield
// Jadon
// Fan
// is
// Awesome
```
