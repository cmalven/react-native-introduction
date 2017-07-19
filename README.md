# React Native Introduction
[React Native](https://facebook.github.io/react-native/)


## Initial Setup

### Prerequisites

- Node
- [Expo XDE for Mac](https://expo.io/tools)
- [Expo iOS Client on the App Store](https://itunes.apple.com/app/apple-store/id982107779?ct=www&mt=8)

### Installing React Native

```bash
npm install -g create-react-native-app
```


## Creating a project

```bash
create-react-native-app my-project
cd my-project
yarn start (or npm start)
```


## What is Expo?
You’re going to see the name `Expo` or `Exponent` thrown around a lot. What is it? Expo is an Open Source Framework and Toolset for building React Native apps. You can kind of think of it it like the relationship between Ruby and Ruby on Rails. It isn’t necessary to build React Native apps, but it makes a lot of things easier, and the default app we’ll create uses it.


## Default project: high-level

**Checkout Git tag 1**

### .babelrc
Typical Babel config, allows fancy new Javascript features and turns your .jsx files into standard Javascript.

### .flowconfig
Flow is a static type checker for Javascript. You mostly don’t need to know about it or what it does, but it analyzes your code and checks for potential bugs depending on object types.

### .gitignore
Hides various files from Git

### .watchmanconfig
Watchman is the library React Native uses to watch your code for changes and update the app preview when things change.

### App.js
This is the top-level Javascript file for your app. Everything starts here, and this file will be used by both iOS and Android by default (you can also have separate base .js files for each if you want).

### app.json
Just some basic info for your app.

### App.test.js
Tests for your app. You can run these tests with `yarn test` or `npm test`. The tests are powered by Facebook’s [Jest](https://facebook.github.io/jest/) testing library.

### package.json
Typical stuff.

### README.md
An overly-verbose default README.


## Start your app (if you haven’t already)

- `yarn start` or `npm start`
- Open the Expo XDE app on your Mac
- Click on your project in Expo
- Open the Expo app on your iPhone and scan the QR code that appeared in your terminal


## Default project: App.js

----
#### Sidebar: JS Next syntax

You’re going to see a lot of cutting-edge javascript syntax in react native projects and examples. Because React Native doesn’t need to worry about browser support, it can use whatever fancy features it wants.

At the very least, you’re going to want to be familiar with Javascript [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), how the [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) syntax for modules works, and also [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function). These will all come up fairly frequently, and are helpful to understand in general.
---

### Walking through App.js

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
```

Here we’re importing React itself, and any individual React Native modules we use in this specific file. These two lines (or lines like them) will probably appear at the top of almost every file in your React Native project.

```js
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}
```

Other than the `export default` this is all pretty much React 101 code. We’re creating a new JS `Class` that uses `React.Component` as it’s base, and has only one method: `render`.

`render()` is the only method that a React Component is required to have, and it returns JSX that describes what should be rendered to the screen for the component.

All React components need to render one and only one wrapper element: here (and most of the time in React Native) the wrapper is a `<View>` element. When using React in a browser it is typically just a `<div>` element.

Within the `<View>` we’re rendering three different `<Text>` elements, which behind the scenes are creating native iOS or Android text elements.

The `<View>` also includes some styles using `StyleSheet`, which allows you to define pseudo-CSS styles that will be applied to the element. 

---
#### Sidebar: Capitalization in React/React Native

In HTML and CSS you’re probably used to naming things with hyphens. Because React is all javascript, we can’t use hyphens for naming, and instead it’s typical to use camel-casing just like you would in javascript normally. So instead of `background-color` we use `backgroundColor`.

---

## Reorganization

A React/React Native app is going to consist of a LOT of components, typically nested within each other, so it’s good to get into a habit of separating these components out into their own files and importing them as needed.

Let’s see what it would take to move our base component out into it’s own file.

**Checkout Git tag 2**

Now if we look at `App.js` we can see that there is barely anything in the file anymore. We’re importing a new component from `./jsx/Home` and we’re only rendering that component in our base component.

If we jump into `./jsx/Home` we see that almost all of the code that was previously in `App.js` has moved into this file.

Here you can also see how easy it is for a React component to render a nested react component.


## Passing data between React components: Props

When a React component renders another React component, it’s common to need to pass data between them. This is done using what is called `props`, and they essentially look like attributes that you had to the child component when you’re rendering it.

_Go through little example of passing props from App down to Home to change the text_


## Adding simple interaction

**Checkout Git tag 3**

Here’s what changed:

- We imported a few new React Components: `Button` and `Alert`
- We’re now rendering a new `<Button>` component.
- The `<Button>` component has a few required Props: `title` and `onPress`
- The `onPress` prop just specifies a method on the current class that we want to trigger when the button is pressed.
- We can see the use of `{` and `}` inside of our JSX code. This allows us to include javascript inside of JSX.


## Basic Navigation

iOS and Android have different navigation UIs, so for this demo we’ll be focusing on iOS and the `NavigatorIOS` component: [NavigatorIOS](https://facebook.github.io/react-native/docs/navigatorios.html)

**Checkout Git tag 4**

Here’s what changed:

- `App.js` now imports `NavigatorIOS` and renders that instead of rendering the `Home` component directly.
- The new `<NavigatorIOS>` component needs to include an additional route, which specifies a title and component to render when the app first loads.
- The `Home` component now includes a button with an `onPress` event that “pushes” another component (in this case an `AnotherPage` component) onto the navigation stack.
- When we click `Go to Another Page` the new component gets added to the navigation stack, and the navigator title bar automatically updates to reflect the new page. When we click the “back” button, the current components gets “popped” off of the navigation stack and we’re back where we started.

## Fetching content from an API

React Native is basically just javascript, so anything you can do in Javascript you can do in React Native.

Let’s use `async/await` and `fetch` to fetch some data from a remote API and render it into our component.

**Checkout Git tag 5**

Here’s what changed:

- We added a `constructor` method to our `AnotherPage` component. This is always called behind the scenes, but we can also specify it if we want to do some extra work when the component is first created.
- In our constructor we specific the initial `state` of the component. `state` is a way to store some data within a component. In this case we’re using it to include default values while we wait for our API call to complete.
- We have a new `componentDidMount` method on the component. This is a standard React lifecycle event that occurs when a component is first “mounted” but before it renders. This is typically where you would include custom JS that you want to fire as soon as the component is available. In this case, we’re using it to make an API request as soon as the component mounts. When the request completes, we use the data form the request to update the state.
- Updating the state of a component always forces the component to immediately re-render. So in this case as soon as our API call completes and the new state is set, the component will re-render and we’ll see our new data.
- We’re using an `async` function with the `fetch` api (new javascript fanciness) to wait for a Github API call to complete before returning a promise.

---

# Original Example Documentation

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

Below you'll find information about performing common tasks. The most recent version of this guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

## Table of Contents

* [Updating to New Releases](#updating-to-new-releases)
* [Available Scripts](#available-scripts)
  * [npm start](#npm-start)
  * [npm test](#npm-test)
  * [npm run ios](#npm-run-ios)
  * [npm run android](#npm-run-android)
  * [npm run eject](#npm-run-eject)
* [Writing and Running Tests](#writing-and-running-tests)
* [Environment Variables](#environment-variables)
  * [Configuring Packager IP Address](#configuring-packager-ip-address)
* [Adding Flow](#adding-flow)
* [Customizing App Display Name and Icon](#customizing-app-display-name-and-icon)
* [Sharing and Deployment](#sharing-and-deployment)
  * [Publishing to Expo's React Native Community](#publishing-to-expos-react-native-community)
  * [Building an Expo "standalone" app](#building-an-expo-standalone-app)
  * [Ejecting from Create React Native App](#ejecting-from-create-react-native-app)
    * [Build Dependencies (Xcode & Android Studio)](#build-dependencies-xcode-android-studio)
    * [Should I Use ExpoKit?](#should-i-use-expokit)
* [Troubleshooting](#troubleshooting)
  * [Networking](#networking)
  * [iOS Simulator won't open](#ios-simulator-wont-open)
  * [QR Code does not scan](#qr-code-does-not-scan)

## Updating to New Releases

You should only need to update the global installation of `create-react-native-app` very rarely, ideally never.

Updating the `react-native-scripts` dependency of your app should be as simple as bumping the version number in `package.json` and reinstalling your project's dependencies.

Upgrading to a new version of React Native requires updating the `react-native`, `react`, and `expo` package versions, and setting the correct `sdkVersion` in `app.json`. See the [versioning guide](https://github.com/react-community/create-react-native-app/blob/master/VERSIONS.md) for up-to-date information about package version compatibility.

## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start -- --reset-cache
# or
yarn start -- --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

##### Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

##### Using Genymotion's `adb`

1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.
2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).
3. Make sure that you can run adb from your terminal.

#### `npm run eject`

This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.

**Warning:** Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an [Xcode and/or Android Studio environment](https://facebook.github.io/react-native/docs/getting-started.html) set up.

## Customizing App Display Name and Icon

You can edit `app.json` to include [configuration keys](https://docs.expo.io/versions/latest/guides/configuration.html) under the `expo` key.

To change your app's display name, set the `expo.name` key in `app.json` to an appropriate string.

To set an app icon, set the `expo.icon` key in `app.json` to be either a local path or a URL. It's recommended that you use a 512x512 png file with transparency.

## Writing and Running Tests

This project is set up to use [jest](https://facebook.github.io/jest/) for tests. You can configure whatever testing strategy you like, but jest works out of the box. Create test files in directories called `__tests__` to have the files loaded by jest. See the [the template project](https://github.com/react-community/create-react-native-app/tree/master/react-native-scripts/template/__tests__) for an example test. The [jest documentation](https://facebook.github.io/jest/docs/getting-started.html) is also a wonderful resource, as is the [React Native testing tutorial](https://facebook.github.io/jest/docs/tutorial-react-native.html).

## Environment Variables

You can configure some of Create React Native App's behavior using environment variables.

### Configuring Packager IP Address

When starting your project, you'll see something like this for your project URL:

```
exp://192.168.0.2:19000
```

The "manifest" at that URL tells the Expo app how to retrieve and load your app's JavaScript bundle, so even if you load it in the app via a URL like `exp://localhost:19000`, the Expo client app will still try to retrieve your app at the IP address that the start script provides.

In some cases, this is less than ideal. This might be the case if you need to run your project inside of a virtual machine and you have to access the packager via a different IP address than the one which prints by default. In order to override the IP address or hostname that is detected by Create React Native App, you can specify your own hostname via the `REACT_NATIVE_PACKAGER_HOSTNAME` environment variable:

Mac and Linux:

```
REACT_NATIVE_PACKAGER_HOSTNAME='my-custom-ip-address-or-hostname' npm start
```

Windows:
```
set REACT_NATIVE_PACKAGER_HOSTNAME='my-custom-ip-address-or-hostname'
npm start
```

The above example would cause the development server to listen on `exp://my-custom-ip-address-or-hostname:19000`.

## Adding Flow

Flow is a static type checker that helps you write code with fewer bugs. Check out this [introduction to using static types in JavaScript](https://medium.com/@preethikasireddy/why-use-static-types-in-javascript-part-1-8382da1e0adb) if you are new to this concept.

React Native works with [Flow](http://flowtype.org/) out of the box, as long as your Flow version matches the one used in the version of React Native.

To add a local dependency to the correct Flow version to a Create React Native App project, follow these steps:

1. Find the Flow `[version]` at the bottom of the included [.flowconfig](.flowconfig)
2. Run `npm install --save-dev flow-bin@x.y.z` (or `yarn add --dev flow-bin@x.y.z`), where `x.y.z` is the .flowconfig version number.
3. Add `"flow": "flow"` to the `scripts` section of your `package.json`.
4. Add `// @flow` to any files you want to type check (for example, to `App.js`).

Now you can run `npm run flow` (or `yarn flow`) to check the files for type errors.
You can optionally use a [plugin for your IDE or editor](https://flow.org/en/docs/editors/) for a better integrated experience.

To learn more about Flow, check out [its documentation](https://flow.org/).

## Sharing and Deployment

Create React Native App does a lot of work to make app setup and development simple and straightforward, but it's very difficult to do the same for deploying to Apple's App Store or Google's Play Store without relying on a hosted service.

### Publishing to Expo's React Native Community

Expo provides free hosting for the JS-only apps created by CRNA, allowing you to share your app through the Expo client app. This requires registration for an Expo account.

Install the `exp` command-line tool, and run the publish command:

```
$ npm i -g exp
$ exp publish
```

### Building an Expo "standalone" app

You can also use a service like [Expo's standalone builds](https://docs.expo.io/versions/latest/guides/building-standalone-apps.html) if you want to get an IPA/APK for distribution without having to build the native code yourself.

### Ejecting from Create React Native App

If you want to build and deploy your app yourself, you'll need to eject from CRNA and use Xcode and Android Studio.

This is usually as simple as running `npm run eject` in your project, which will walk you through the process. Make sure to install `react-native-cli` and follow the [native code getting started guide for React Native](https://facebook.github.io/react-native/docs/getting-started.html).

#### Should I Use ExpoKit?

If you have made use of Expo APIs while working on your project, then those API calls will stop working if you eject to a regular React Native project. If you want to continue using those APIs, you can eject to "React Native + ExpoKit" which will still allow you to build your own native code and continue using the Expo APIs. See the [ejecting guide](https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md) for more details about this option.

## Troubleshooting

### Networking

If you're unable to load your app on your phone due to a network timeout or a refused connection, a good first step is to verify that your phone and computer are on the same network and that they can reach each other. Create React Native App needs access to ports 19000 and 19001 so ensure that your network and firewall settings allow access from your device to your computer on both of these ports.

Try opening a web browser on your phone and opening the URL that the packager script prints, replacing `exp://` with `http://`. So, for example, if underneath the QR code in your terminal you see:

```
exp://192.168.0.1:19000
```

Try opening Safari or Chrome on your phone and loading

```
http://192.168.0.1:19000
```

and

```
http://192.168.0.1:19001
```

If this works, but you're still unable to load your app by scanning the QR code, please open an issue on the [Create React Native App repository](https://github.com/react-community/create-react-native-app) with details about these steps and any other error messages you may have received.

If you're not able to load the `http` URL in your phone's web browser, try using the tethering/mobile hotspot feature on your phone (beware of data usage, though), connecting your computer to that WiFi network, and restarting the packager.

### iOS Simulator won't open

If you're on a Mac, there are a few errors that users sometimes see when attempting to `npm run ios`:

* "non-zero exit code: 107"
* "You may need to install Xcode" but it is already installed
* and others

There are a few steps you may want to take to troubleshoot these kinds of errors:

1. Make sure Xcode is installed and open it to accept the license agreement if it prompts you. You can install it from the Mac App Store.
2. Open Xcode's Preferences, the Locations tab, and make sure that the `Command Line Tools` menu option is set to something. Sometimes when the CLI tools are first installed by Homebrew this option is left blank, which can prevent Apple utilities from finding the simulator. Make sure to re-run `npm/yarn run ios` after doing so.
3. If that doesn't work, open the Simulator, and under the app menu select `Reset Contents and Settings...`. After that has finished, quit the Simulator, and re-run `npm/yarn run ios`.

### QR Code does not scan

If you're not able to scan the QR code, make sure your phone's camera is focusing correctly, and also make sure that the contrast on the two colors in your terminal is high enough. For example, WebStorm's default themes may [not have enough contrast](https://github.com/react-community/create-react-native-app/issues/49) for terminal QR codes to be scannable with the system barcode scanners that the Expo app uses.

If this causes problems for you, you may want to try changing your terminal's color theme to have more contrast, or running Create React Native App from a different terminal. You can also manually enter the URL printed by the packager script in the Expo app's search bar to load it manually.
