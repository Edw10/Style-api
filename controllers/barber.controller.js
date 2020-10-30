'use strict';

const Barber = require('../models/barber.model');
const { OK, ERROR, NOTFOUND, ERRORSERVER } = require('../services/messages');
const mongoose = require('mongoose');

class BarberController {

    async getBarber(req, res) {
        let bid = req.params.bid;

        if (mongoose.Types.ObjectId.isValid(bid)) {
            Barber.findById(bid, (err, barber) => {
                if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                if (!barber) return res.status(404).send({ message: `${NOTFOUND}`, description: "barber does not exist in database" });
                else {
                    return res.status(200).send({ message: `${OK}`, barber });
                }
            });
        } else {
            return res.status(404).send({ message: `${NOTFOUND}`, description: 'incorrect barber id' })
        }
    };

    async getBarbers(req, res) {
        Barber.find({}, (err, barbers) => {
            if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
            if (!barbers) return res.status(404).send({ message: `${NOTFOUND}`, description: "barbers do not exist in database" });
            else {
                return res.status(200).send({ message: `${OK}`, barbers })
            }
        })
    };

    async saveBarber(req, res) {

        let barber = new Barber();

        barber.firstName = req.body.firstName;
        barber.secondName = req.body.secondName;
        barber.firstLastName = req.body.firstLastName;
        barber.secondLastName = req.body.secondLastName;
        barber.age = req.body.age;
        barber.gender = req.body.gender;
        barber.city = req.body.city;
        barber.country = req.body.country;
        barber.cellphone = req.body.cellphone;
        barber.email = req.body.email;
        barber.image = req.body.image;
        barber.hasAuth = req.body.hasAuth;
        barber.starHour = req.body.starHour;
        barber.finalHour = req.body.finalHour;
        barber.description = req.body.description;

        barber.save((err, barberStored) => {
            if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
            else {
                return res.status(200).send({ message: `${OK}`, barber: barberStored });
            }
        })
    };

    async updateBarber(req, res) {
        let bid = req.params.bid
        let update = req.body

        if (mongoose.Types.ObjectId.isValid(bid)) {
            Barber.findOneAndUpdate({ _id: bid }, { $set: update }, { new: true }, (err, barberUpdate) => {
                if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                else {
                    return res.status(200).send({ message: `${OK}`, barber: barberUpdate });
                }
            });
        } else {
            return res.status(404).send({ message: `${NOTFOUND}`, description: 'incorrect barber id' })
        }
    };

    async deleteBarber(req, res) {
        let bid = req.params.bid;

        if (mongoose.Types.ObjectId.isValid(bid)) {
            Barber.findById(bid, (err, barber) => {
                if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                else {
                    barber.remove(err => {
                        if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` })
                        return res.status(200).send({ message: `${OK}`, description: 'barber deleted' })
                    });
                }
            });
        } else {
            return res.status(404).send({ message: `${NOTFOUND}`, description: 'incorrect barber id' })
        };
    };
}

module.exports = new BarberController();
