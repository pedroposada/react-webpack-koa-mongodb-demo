# Todos Fullstack Demo - React Redux JWT Koa MongoDB

Application written in Javascript to illustrate the use and implementation of a client/server web application using React, Redux, Jason Web Token, Koa, MongoDB.

This repo consists of a client-side application with a login page and a todo's list page. And a server-side application that provides an API to persist all action that happen in the client.

## Client
- React - used for presentation layer to render styled HTML on the client (browser).
- Redux - used to handle application state on the client and send http requests to the server.
- JWT - used to implement client/server authentication.
- Webpack - used to load and bundle modules, to prepare the client side application for deployment.
- Mocha and Karma - used as the framework for unit testing

## Server
- Koa - used to implement routes.
- Mongoose - used to connect DB and to query it.
- MongoDB - used as database to store 'todos'.
- Mocha - used as the framework for unit testing the routes.

## Minimum Requirements
- Node version 4.2.2 [website](https://nodejs.org)
- MongoDB version 3.2.0 [website](https://docs.mongodb.org)

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
##### Run tests for the Koa server
```
npm run backend:test
```
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