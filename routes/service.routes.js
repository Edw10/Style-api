'use strict';

const router = require('express').Router();

const { ServiceController } = require('../controllers');

router.get('/services', ServiceController.getServices); 
router.get('/service/id/:sid', ServiceController.getService);
router.post('/service', ServiceController.saveService);
router.delete('/service/id/:sid', ServiceController.deleteService);

module.exports = router;