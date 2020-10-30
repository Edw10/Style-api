'use strict';

const router = require('express').Router();

const { BarbershopController } = require('../controllers');
//const { AuthMiddleware } = require('../middleware');

router.get('/barbershop',BarbershopController.getBarbershops);
router.get('/barbershop/id/:bsid', BarbershopController.getBarbershop);
router.get('/barbershop/name/:bsname', BarbershopController.getBarbershopByName);
router.post('/barbershop', BarbershopController.saveBarbershop);
router.put('/barbershop/id/:bsid', BarbershopController.updateBarbershop);
router.delete('/barbershop/id/:bsid',BarbershopController.deleteBarberShop);

module.exports = router;