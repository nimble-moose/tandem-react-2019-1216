# Exercise: React Component Lifecycles

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

For more information about CRA, see [CREATE_REACT_APP.md](./CREATE_REACT_APP.md)

## Objective

In this exercise we have a partially-built chat application. The React components are class-based, but have had all of their lifecycle methods removed. We will implement features step by step by adding in lifecycle methods that make calls to existing instance methods.

## Installing dependencies

To install dependencies, make sure you're running a recent version of Node.js. The project was authored under Node 12, but 10 will probably work fine.

From the exercise directory, simply run

```
npm install
```

## Running the application

The application connects to a mock REST API. To start that server, run

```
npm run server
```

Once that server is running, start the dev watch task from a different terminal window by running

```
npm start
```

This will start the create-react-app development environment, which includes linting, transpilation from ES6, and hot reloading. A browser window should open automatically to http://localhost:3000, but if not you can navigate there manually.


## Starting Point

At http://localhost:3000, you should just see a cartoon dog and the word "PetFeed" in the upper left corner. If there are no errors on your browser console, you're all set to start.

## The Exercise

The exercise will be done in pairs, with each section below following this format:

1. Explanation of feature by instructor, and group discussion of possible approaches
2. Pairs implement the feature
3. Instructor demonstrates solution

### Features

1. Fetching and displaying list of channels
2. Fetching and displaying messages for a given channel
3. Displaying a user profile
4. Subscribing to new data in a channel
5. Automatically scrolling to bottom of message list when new message arrives
