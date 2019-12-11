# Exercise: React Hooks

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

For more information about CRA, see [CREATE_REACT_APP.md](./CREATE_REACT_APP.md)

## Objective

Unlike the Lifecycles exercise, this one starts with a fully-functioning application. The components are all Class-based, and we will be refactoring the application into a Hooks-based implementation, creating reusable hooks that may be used elsewhere.

The application is one page which loads a small user profile. The profile may be toggled between display mode and edit mode. When in edit mode, you have the option to save your changes by sending a request to the mock REST API, or to discard your changes by toggling back to display mode.

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

At http://localhost:3000, you should just see a user profile with first name, last name, and email. Clicking "Edit" should toggle you to an editable form. Clicking "Save" should persist your changes (refresh the page to test) or "Cancel" should revert them. If you can do all of that and there are no errors on your browser console, you're all set to start.

## The Exercise

The exercise will be done in pairs, with each feature below following this format:

1. Explanation of feature by instructor, and group discussion of possible approaches
2. Pairs implement the feature
3. Instructor demonstrates solution

### Features

1. Refactor Form class to use toggle-able fields, rather than toggling entire display
2. Create useToggle hook as simple extension of useState
3. Create useForm hook to create and keep form state based on field definitions
4. Create useRevert hook to allow user to discard form changes
5. Create useCrud hook to persist form state to back end
