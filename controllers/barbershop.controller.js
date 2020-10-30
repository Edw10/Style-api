'use strict';

const Barbershop = require('../models/Barbershop.model');
const { OK, ERROR, NOTFOUND, ERRORSERVER } = require('../services/messages');
const mongoose = require('mongoose');

class BarbershopController {

    async getBarbershop(req, res) {
        let bsid = req.params.bsid;

        if (mongoose.Types.ObjectId.isValid(bsid)) {
            Barbershop.findById(bsid, (err, barbershop) => {
                if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                if (!barbershop) return res.status(404).send({ message: `${NOTFOUND}`, description: "barbershop does not exist in database" });
                else {
                    return res.status(200).send({ message: `${OK}`, barbershop });
                }
            });
        } else {
            return res.status(404).send({ message: `${NOTFOUND}`, description: 'incorrect barbershop id' });
        }
    };

    async getBarbershops(req, res) {
        Barbershop.find({}, (err, barbershops) => {
            if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
            if (!barbershops) return res.status(404).send({ message: `${NOTFOUND}`, description: "barbershops do not exist in database" });
            else {
                return res.status(200).send({ message: `${OK}`, barbershops })
            }
        })
    };

    async getBarbershopByName(req, res){
        let bsname = req.params.bsname;

        Barbershop.find({ 'name': new RegExp(bsname, "i")}, (err, barbershops) => {
            if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
            if (!barbershops) return res.status(404).send({ message: `${NOTFOUND}`, description: "barbershops do not exist in database" });
            else {
                return res.status(200).send({ message: `${OK}`, barbershops });
            }
        })
    }

    async saveBarbershop(req, res) {

        let barbershop = new Barbershop();
        barbershop.name = req.body.name;
        barbershop.location = req.body.location;
        barbershop.city = req.body.city;
        barbershop.country = req.body.country;
        barbershop.description = req.body.description;
        barbershop.fundationDate = req.body.fundationDate;
        barbershop.openHour = req.body.openHour;
        barbershop.closeHour = req.body.closeHour;
        barbershop.status = req.body.status;
        barbershop.cellphone = req.body.cellphone;
        barbershop.email = req.body.email;
        barbershop.webpage = req.body.webpage;
        barbershop.picture = req.body.picture;

        barbershop.save((err, barbershopStored) => {
            if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
            else {
                return res.status(200).send({ message: `${OK}`, barbershop: barbershopStored });
            }
        })
    };

    async updateBarbershop(req, res) {
        let bsid = req.params.bsid
        let update = req.body

        if (mongoose.Types.ObjectId.isValid(bsid)) {
            Barbershop.findOneAndUpdate({ _id: bsid }, { $set: update }, { new: true }, (err, barbershopUpdate) => {
                if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                else {
                    return res.status(200).send({ message: `${OK}`, barbershop: barbershopUpdate });
                }
            });
        } else {
            return res.status(404).send({ message: `${NOTFOUND}`, description: 'incorrect babershop id' })
        }
    };

    async deleteBarberShop(req, res) {
        let bsid = req.params.bsid;

        if (mongoose.Types.ObjectId.isValid(bsid)) {
            BarberShop.findById(bsid, (err, barbershop) => {
                if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                else {
                    barbershop.remove(err => {
                        if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` })
                        return res.status(200).send({ message: `${OK}`, description: 'barbershop deleted' })
                    });
                }
            });
        } else {
            return res.status(404).send({ message: `${NOTFOUND}`, description: 'incorrect barbershop id' })
        };
    };
}

module.exports = new BarbershopController();
