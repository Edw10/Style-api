'use strict';

const ScoreBarber = require('../models/scores/scoreBarber');
const ScoreBarbershop = require('../models/scores/scoreBarbershop');

const { OK, ERRORSERVER, ERROR, NOTFOUND} = require('../services/messages');

class ScoreController {

    async getScoresBarber(req,res){
       ScoreBarber.find({}, (err, scoresBarber) =>{
        if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
        if (!scoresBarber) return res.status(404).send({ message: `${NOTFOUND}`, description: "barber scores does not exist in database" });
        else {
            return res.status(200).send({ message: `${OK}`, scoresBarber });
        }
       });
    }
    async getScoresBarbershop(req,res){
        ScoreBarbershop.find({}, (err, scoresBarbershop) =>{
            if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
            if (!scoresBarbershop) return res.status(404).send({ message: `${NOTFOUND}`, description: "barbershop scores does not exist in database" });
            else {
                return res.status(200).send({ message: `${OK}`, scoresBarbershop });
            }
           });

    }
    async postScoreBarber(req,res){
        let scoreBarber = new ScoreBarber();
         scoreBarber.rating = req.body.rating;
         scoreBarber.review = req.body.review;
         scoreBarber.user = req.body.user;
         scoreBarber.barber = req.body.barber;

         scoreBarber.save((err, scoreBarberStored) => {
            if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
            else {
                return res.status(200).send({
                    message: `${OK}`,
                    scoreBarber: scoreBarberStored
                });
            }
        });
    }
    async postScoreBarbershop(req,res){
        let scoreBarbershop = new ScoreBarbershop();
        scoreBarbershop.rating = req.body.rating;
        scoreBarbershop.review = req.body.review;
        scoreBarbershop.user = req.body.user;
        scoreBarbershop.barbershop = req.body.barbershop;

        scoreBarbershop.save((err, scoreBarbershopStored) => {
           if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
           else {
               return res.status(200).send({
                   message: `${OK}`,
                   scoreBarbershop: scoreBarbershopStored
               });
           }
       });
    }
    
}
module.exports = new ScoreController();