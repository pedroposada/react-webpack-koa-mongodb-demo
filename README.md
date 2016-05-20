# Todos Fullstack Demo

React Redux JWT Koa MongoDB

Application written in Javascript to illustrate the use and implementation of a client/server web application using React, Redux, Json Web Token, Koa, MongoDB.

This repo consists of a client-side application with a login page and a todo's list page. And a server-side application that provides an API to persist all action that happen in the client.

As par of this demo, I have configured Mocha and Karma to ouput TAP reports for [Jenkins](https://jenkins.io/)

## Client
- [React](https://facebook.github.io/react/) used for presentation layer to render styled HTML on the client (browser).
- [Redux](http://redux.js.org/) used to handle application state on the client and send http requests to the server.
- [JWT](https://jwt.io/) json web token, used to implement client/server authentication.
- [Webpack](https://webpack.github.io/) used to load and bundle modules, to prepare the client side application for deployment.
- [Karma](https://karma-runner.github.io/0.13/index.html) to run tests agains a headless browser with PhantomJS
- [Mocha](https://mochajs.org/) and Karma; used as the framework for unit testing

## Server
- [Koa](http://koajs.com/) used to implement routes, exposes a RESTful API to the client.
- [Mongoose](http://mongoosejs.com/) used to connect DB and to query it.
- [MongoDB](https://www.mongodb.com/) used as database to store 'todos'.
- [Mocha](https://mochajs.org/) used as the framework for unit testing the routes.

## Minimum Requirements
- [Node](https://nodejs.org) version 4.2.2 
- [MongoDB](https://docs.mongodb.org) version 3.2.0

## Commands
##### Clone repo
```
git clone https://github.com/pedroposada/react-webpack-koa-mongodb-demo.git todos-demo && cd todos-demo
```
##### Resolve and install dependencies
```
npm install
```
##### Restore sample database into MongoDB
```
npm run restoredb
```
This command will restore a new database with name "todosdemo" that contains a collection called "todos".
##### Run tests for the Koa server.
```
npm run test:backend
```
Creates a TAP file in ```./tests/backend.tap```
##### Run tests for the React components.
```
npm run test:frontend
```
Creates a TAP file in ```./tests/frontend.tap```
##### Start Server
```
npm run backend
```
Server will run under http://localhost:5000
##### Start Client
```
npm start
```
Client will run under http://localhost:3000

###### Open your browser and point it to http://localhost:3000

## References
- I did my application structure following [React Redux Starterkit](https://github.com/davezuko/react-redux-starter-kit) guidelines.
- The server implementation was inspired by [Screencasts For Developers from KnowThen](http://knowthen.com/) website.
- For the authentication flow, I followed advise from [Auth0](https://auth0.com/)


## Work in progress
- Write tests for the presentation layer
