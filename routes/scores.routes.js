'use strict';

const router = require('express').Router();

const { ScoreController } = require('../controllers');

router.get('/barber/scores', ScoreController.getScoresBarber); 
router.get('/barbershop/scores', ScoreController.getScoresBarbershop);
router.post('/barber/score', ScoreController.postScoreBarber);
router.post('/barbershop/score', ScoreController.postScoreBarbershop);

module.exports = router;