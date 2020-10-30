'use strict';

const Appoiment = require('../models/appoiment.model');
const mongoose = require('mongoose');

const { OK, ERROR, NOTFOUND, ERRORSERVER } = require('../services/messages');

class AppoimentController {

    async getAppoiment(req, res) {
        let apid = req.params.apid;

        if (mongoose.Types.ObjectId.isValid(apid)) {
            Appoiment.findById(apid, (err, appoiment) => {
                if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                if (!appoiment) return res.status(404).send({ message: `${NOTFOUND}`, description: "appoiment do not exist in database" });
                else {
                    return res.status(200).send({ message: `${OK}`, appoiment });
                }
            });
        } else {
            return res.status(404).send({ message: `${NOTFOUND}`, description: 'incorrect appoiment id' })
        }
    }

    async updateAppoiment(req, res) {
        let apid = req.params.apid
        let update = req.body

        if (mongoose.Types.ObjectId.isValid(apid)) {
            Appoiment.findOneAndUpdate({ _id: apid }, { $set: update }, { new: true }, (err, appoimentUpdate) => {
                if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                else {
                    return res.status(200).send({ message: `${OK}`, appoiment: appoimentUpdate });
                }
            });
        } else {
            return res.status(404).send({ message: `${NOTFOUND}`, description: 'incorrect appoiment id' })
        }
    }

    async saveAppoiment(req, res) {

        let appoiment = new Appoiment();
        appoiment.service = req.body.service;
        appoiment.user = req.body.user;
        appoiment.barber = req.body.barber;
        appoiment.barbershop = req.body.barbershop;
        appoiment.dateTime = req.body.dateTime;
        appoiment.status = req.body.status;
        appoiment.statusPayment = req.body.statusPayment;

        appoiment.save((err, appoimentStored) => {
            if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
            else {
                return res.status(200).send({
                    message: `${OK}`,
                    appoiment: appoimentStored,
                });
            }
        });
    }

}

module.exports = new AppoimentController();
