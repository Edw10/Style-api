'use strict';

const router = require('express').Router();

const { AppoimentController } = require('../controllers');

router.get('/appoiment/id/:apid', AppoimentController.getAppoiment);
router.post('/appoiment', AppoimentController.saveAppoiment);
router.put('/appoiment/id/:apid', AppoimentController.updateAppoiment);

module.exports = router;