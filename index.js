const App = require('./src/app');
const express = require('express');
const app = express();
const port = 3000;

const index = new App(app, port);
index.run();