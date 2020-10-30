'use strict';

const router = require('express').Router();

const { HomeController } = require('../controllers');

router.get('/routes', HomeController.getView);

module.exports = router;