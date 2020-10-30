'use strict';

const router = require('express').Router();

const { BarberController } = require('../controllers');
//const { AuthMiddleware } = require('../middleware'); (firebase o jwt)

router.get('/barber', BarberController.getBarbers );
router.get('/barber/id/:bid', BarberController.getBarber);
router.post('/barber', BarberController.saveBarber);
router.put('/barber/id/:bid', BarberController.updateBarber);
router.delete('/barber/id/:bid', BarberController.deleteBarber);

module.exports = router;