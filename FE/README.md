## Installation Procedure
On your macOS/Linux terminal,
1. Clone this repo and go to the corresponding directory on your local machine
2. Run `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"` to install Homebrew
3. Run `brew install yarn` to install yarn, which is the dependency manager for this project
4. Run `yarn install` to install all the project dependencies that are specified in the [package.json](package.json) file

## Frameworks and Libraries
This project utilizes the following frameworks and libraries:
- Redux
- Material UI

Immutability is important in Redux and, in most cases, can be achieved with functional callback methods, such as `map` and `reduce`, and with the spread operator &mdash; that is, `...` &mdash; in ES6 or above. This project currently does *not* use any special immutable libraries such as Immutable.js or Immer.

Dependabot should automatically detect any updates to the dependencies; when it does, it will create a PR that modifies the the [package.json](package.json) file accordingly and that merges onto the default branch. Be sure to occassionally run `yarn install` to get these updates. **You should never manually modify the [yarn.lock](yarn.lock) file.**

## VSCode Extensions
When you open the project directly on VSCode, the IDE should recommend some useful extensions for you based on the [extensions.json](.vscode/extensions.json) file. You should install these extensions via the VSCode Marketplace. You can add your own recommendations, but please update the list below if you do.

The following VSCode extensions are recommended for this project:
- GitLens &ndash; further integrates git in the IDE
- Live Share &ndash;	shares your edits in real-time with other people, useful for pair programming
- npm Intellisense &ndash;	autocompletes npm modules in import statements
- Path Intellisense &ndash; autocompletes filenames
- Prettier &ndash; formats your code
- ESLint &ndash; enforces code styling rules
- Bracket Pair Colorizer &ndash; matches brackets by user-defined colour
- Auto Rename Tag &ndash; automatically renames pair HTML, XML, JSX and TSX tags
- html to JSX &ndash; (almost) converts plain HTML code to the corresponding JSX code
- Markdown All in One &ndash; provides markdown tools such as keyboard shortcuts, table of contents and auto preview

## Tools
The following tools are recommended for this project:
- React Developer Tools &ndash; 
   [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) 
   | [Firefox](https://addons.mozilla.org/en-CA/firefox/addon/react-devtools/) 
   | [Edge](https://microsoftedge.microsoft.com/addons/detail/gpphkfbcpidddadnkolkpfckpihlkkil)
- Redux DevTools &ndash;
   [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) 
   | [Firefox](https://addons.mozilla.org/en-CA/firefox/addon/reduxdevtools/) 

## Styling
This project utilizes Prettier to enforce the styling rules that are in the [.prettierrc](.pretterric) file. It will auto-format your code in a particular file whenever you save that file. 

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
