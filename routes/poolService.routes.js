'use strict';

const router = require('express').Router();

const { PoolServiceController } = require('../controllers');

router.get('/poolservices', PoolServiceController.getPoolServices);
router.get('/poolservice/id/:psid', PoolServiceController.getPoolService);
router.post('/poolservice', PoolServiceController.savePoolService);
router.put('/poolservice/id/:psid', PoolServiceController.updatePoolService);
router.delete('/poolservice/id/:psid',PoolServiceController.deleteBarberShop);

module.exports = router;