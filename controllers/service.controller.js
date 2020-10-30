'use strict';

const Service = require('../models/service.model');
const mongoose = require('mongoose');

const { OK, ERROR, NOTFOUND, ERRORSERVER } = require('../services/messages');

class ServiceController {

    async getService(req, res) {
        let sid = req.params.sid;

        if (mongoose.Types.ObjectId.isValid(sid)) {
            Service.findById(sid, (err, service) => {
                if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                if (!service) return res.status(404).send({ message: `${NOTFOUND}`, description: "service do not exist in database" });
                else {
                    return res.status(200).send({ message: `${OK}`, service });
                }
            });
        } else {
            return res.status(404).send({ message: `${NOTFOUND}`, description: 'incorrect service id' })
        }
    }

    async getServices(req, res) {
        Service.find({}, (err, services) => {
            if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
            if (!services) return res.status(404).send({ message: `${NOTFOUND}`, description: "services does not exist in database" });
            else {
                return res.status(200).send({ message: `${OK}`, services })
            }
        })
    };

    async updateService(req, res) {
        let sid = req.params.sid
        let update = req.body

        if (mongoose.Types.ObjectId.isValid(sid)) {
            Service.findOneAndUpdate({ _id: sid }, { $set: update }, { new: true }, (err, serviceUpdate) => {
                if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                else {
                    return res.status(200).send({ message: `${OK}`, service: serviceUpdate });
                }
            });
        } else {
            return res.status(404).send({ message: `${NOTFOUND}`, description: 'incorrect service id' })
        }
    }

    async saveService(req, res) {

        let service = new Service();
        service.barbershop = req.body.barbershop;
        service.name = req.body.name;
        service.price = req.body.price;
        service.duration = req.body.duration;
        service.description = req.body.description;

        service.save((err, serviceStored) => {
            if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
            else {
                return res.status(200).send({
                    message: `${OK}`,
                    service: serviceStored,
                });
            }
        });
    }

    async deleteService(req, res) {
        let sid = req.params.sid;

        if (mongoose.Types.ObjectId.isValid(sid)) {
            Service.findById(sid, (err, service) => {
                if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                else {
                    service.remove(err => {
                        if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` })
                        return res.status(200).send({ message: `${OK}`, description: 'service deleted' })
                    });
                }
            });
        } else {
            return res.status(404).send({ message: `${NOTFOUND}`, description: 'incorrect service id' })
        };
    };

}

module.exports = new ServiceController();
