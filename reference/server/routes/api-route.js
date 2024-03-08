const express = require('express');
const controller = require('../controller/api-controller.js')
const api = express.Router();

api.get('/question', controller.api);

module.exports = api;