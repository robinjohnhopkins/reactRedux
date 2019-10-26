# Starter Kit for [Building Applications in React and Redux](http://www.pluralsight.com/author/cory-house) on Pluralsight

## Get Started

1. **Install [Node 8](https://nodejs.org)** or newer. Need to run multiple versions of Node? Use [nvm](https://github.com/creationix/nvm) or [nvm-windows](https://github.com/coreybutler/nvm-windows)(https://github.com/coryhouse/pluralsight-redux-starter/archive/master.zip)
2. **Navigate to this project's root directory on the command line.**
3. **Install Node Packages.** - `npm install`
4. **Install [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) and [Redux Dev Tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)** in Chrome.
5. Having issues? See below.

## Having Issues? Try these things first:

1. Run `npm install` - If you forget to do this, you'll get an error when you try to start the app later.
2. Don't run the project from a symbolic link. It will cause issues with file watches.
3. Delete any .eslintrc in your user directory and disable any ESLint plugin / custom rules within your editor since these will conflict with the ESLint rules defined in the course.
4. On Windows? Open your console as an administrator. This will assure the console has the necessary rights to perform installs.
5. Ensure you do not have NODE_ENV=production in your env variables as it will not install the devDependencies. To check run this on the command line: `set NODE_ENV`. If it comes back as production, you need to clear this env variable.
6. Nothing above work? Delete your node_modules folder and re-run npm install.

### Production Dependencies

| **Dependency**   | **Use**                                              |
| ---------------- | ---------------------------------------------------- |
| bootstrap        | CSS Framework                                        |
| immer            | Helper for working with immutable data               |
| prop-types       | Declare types for props passed into React components |
| react            | React library                                        |
| react-dom        | React library for DOM rendering                      |
| react-redux      | Connects React components to Redux                   |
| react-router-dom | React library for routing                            |
| react-toastify   | Display messages to the user                         |
| redux            | Library for unidirectional data flows                |
| redux-thunk      | Async redux library                                  |
| reselect         | Memoize selectors for performance                    |

### Development Dependencies

| **Dependency**                  | **Use**                                                          |
| ------------------------------- | ---------------------------------------------------------------- |
| @babel/core                     | Transpiles modern JavaScript so it runs cross-browser            |
| babel-eslint                    | Lint modern JavaScript via ESLint                                |
| babel-loader                    | Add Babel support to Webpack                                     |
| babel-preset-react-app          | Babel preset for working in React. Used by create-react-app too. |
| css-loader                      | Read CSS files via Webpack                                       |
| cssnano                         | Minify CSS                                                       |
| enzyme                          | Simplified JavaScript Testing utilities for React                |
| enzyme-adapter-react-16         | Configure Enzyme to work with React 16                           |
| eslint                          | Lints JavaScript                                                 |
| eslint-loader                   | Run ESLint via Webpack                                           |
| eslint-plugin-import            | Advanced linting of ES6 imports                                  |
| eslint-plugin-react             | Adds additional React-related rules to ESLint                    |
| fetch-mock                      | Mock fetch calls                                                 |
| html-webpack-plugin             | Generate HTML file via webpack                                   |
| http-server                     | Lightweight HTTP server to serve the production build locally    |
| jest                            | Automated testing framework                                      |
| json-server                     | Quickly create mock API that simulates create, update, delete    |
| mini-css-extract-plugin         | Extract imported CSS to a separate file via Webpack              |
| node-fetch                      | Make HTTP calls via fetch using Node - Used by fetch-mock        |
| npm-run-all                     | Display results of multiple commands on single command line      |
| postcss-loader                  | Post-process CSS via Webpack                                     |
| react-test-renderer             | Render React components for testing                              |
| react-testing-library           | Test React components                                            |
| redux-immutable-state-invariant | Warn when Redux state is mutated                                 |
| redux-mock-store                | Mock Redux store for testing                                     |
| rimraf                          | Delete files and folders                                         |
| style-loader                    | Insert imported CSS into app via Webpack                         |
| webpack                         | Bundler with plugin ecosystem and integrated dev server          |
| webpack-bundle-analyzer         | Generate report of what's in the app's production bundle         |
| webpack-cli                     | Run Webpack via the command line                                 |
| webpack-dev-server              | Serve app via Webpack                                            |

### Prettier

Removed beautify, installed prettier. Made vscode call prettier on save.
preferences - Settings - formatOnSave tick

### debugger can be added anywher in code

debugger;

### ESLint

ESLint extension is added to see lint errors in vscode.
Also, in webpack.config.dev.js:

```
use: ["babel-loader", "eslint-loader"]
```

means run eslint-loader before babel-loader, and this will show linting issues.
e.g. undefined variables.

### webpack

in package.json, webpack has been added like this:

```
 "scripts": {
    "start": "webpack-dev-server --config webpack.config.dev.js --port 3000"
  },
```

### React 16.8

React 16.8 allows you to write function components with Hooks.
e.g. useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, useImperativeHandler, useLayoutEffect, useDebugValue, etc
Theerafter componentDidError amd getSnapshotBeforeUpdate are the only things you can do in a class that you can't do in a function component.

### Styling

```
<div className="jumbotron">
```

Styles home page with a nice look and feel.

### Routing

App uses Switch and Route for client side routing.

### Redux

Redux is an alternate to the less complex 'React context'.
It provides state in one place - a client side store.

### React context

'React context' is not used in this app but allows you to declare high up in the App structure, a UserContextProvider (say), which holds data and functions. Then, lower down in the app tree of components, declare a UserContext.Consumer whcih uses the data and functions.
This avoids the lifting up of state and passing down through props issue.

### Object copying

Spread operator and Object.Assign shallow copy objects.

### 4 ways to Handle mapDispatchToProps

#### ignore it

```
this.props.dispatch(loadCourses());
```

#### manually wrap in dispatch

```
function mapDispatchToProps(dispatch) {
  return {
    loadCourses: () => dispatch(loadCourses())
  };
}
```

#### use bindActionCreators

```
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
```

#### return object (best?)

```
const mapDispatchToProps = {
  incrementCounter
}
```

### Redux Flow

Action
Store
Reducer
Container Component

### Mock Api

```
  "scripts": {
    "start": "run-p start:dev start:api",
    "start:dev": "webpack-dev-server --config webpack.config.dev.js --port 3000",
    "prestart:api": "node tools/createMockDb.js",
    "start:api": "node tools/apiServer.js"
  },
```

runs a mock server on

http://localhost:3001/

serving up json which is recreated each run at

http://localhost:3001/courses

http://localhost:3001/authors

### setup process.env.API_URL replacement

webpack.config.dev.js

```
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001")
    }),
```

### Redux Middleware

Redux Middleware runs after action and before reducer

### Redux Async Libraries

#### redux-thunk

return funcs from action creators

#### redux-promise

use promises for async

#### redux-observable

use RxJS observables

#### redux-saga

use generators

### asyncThunk branch

In the asyncThunk branch, we:

- added a mock api
- added thunk thunk async middleware
- altered the course code to display the courses loaded from api

### Async Writes in Redux

Add ManageCoursePage which is a function rather than a class.
It uses useEffect, which takes two params. The function to run code and an array of props that cause the code to run.

```
  useEffect(() => {
    // things to do when the second param items change
  }, [props.course]);
```

It also uses an object style declaration with mapDispatchToProps.
see '4 ways to Handle mapDispatchToProps' above.

It uses a computed property sytax:

```
  function handleChange(event) {
    const {name, value} = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId"
        ? parseInt(value, 10)
        : value
    }));
  }
```

## Spinner and In Progress Async Mechanism

Altered these files 

```
	new file:   src/components/common/Spinner.css
	new file:   src/components/common/Spinner.js
	modified:   src/components/courses/CoursesPage.js
	modified:   src/redux/actions/actionTypes.js
	new file:   src/redux/actions/apiStatusActions.js
	modified:   src/redux/actions/authorActions.js
	modified:   src/redux/actions/courseActions.js
	new file:   src/redux/reducers/apiStatusReducer.js
	modified:   src/redux/reducers/index.js
	modified:   src/redux/reducers/initialState.js
	modified:   tools/apiServer.js
```

to provide el neato spinner to show async operation is in progress
with status update mechanism.


## Jest 

snapshot-tools extension to see snapshot when hovering over toMatchSnapshot function.

package.json

```
    "test":"jest --watch"
  },
  "jest": {
    "setupFiles": [
      "./tools/testSetup.js"
    ],
    "moduleNameMapper": {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/tools/fileMock.js",
      "\\.(css|less)$": "<rootDir>/tools/styleMock.js"
    }
  },
```

```
src/index.test.js
src/components/courses/CourseForm.Snapshots.test.js
tools/fileMock.js
tools/styleMock.js
tools/testSetup.js
```

```npm t```

To run tests. Snapshots are written and an error is shown on changed output.

## Enzyme test

src/components/courses/CourseForm.Enzyme.test.js

uses shallow - no DOM created;no child components created


src/components/common/Header.test.js

uses mount - DOM created in memory with JSDOM; child components rendered


## ReactTestingLibrary

src/components/courses/CourseForm.ReactTestingLibrary.test.js

