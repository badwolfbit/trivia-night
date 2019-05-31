const express = require('express');
const path = require('path');
const cors = require('cors');
const parser = require('body-parser');
const middleware = express.Router();

middleware.use(cors());
middleware.use(parser.json());
middleware.use(express.urlencoded({extended: true}));
middleware.use(express.static(__dirname + "/../../client/dist"));

module.exports = middleware;