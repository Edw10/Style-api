'use strict';

const PoolService = require('../models/poolServices.model');
const { OK, ERROR, NOTFOUND, ERRORSERVER } = require('../services/messages');
const mongoose = require('mongoose');

class PoolServiceController {

    async getPoolService(req, res) {
        let psid = req.params.psid;

        if (mongoose.Types.ObjectId.isValid(psid)) {
            PoolService.findById(psid, (err, poolService) => {
                if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                if (!poolService) return res.status(404).send({ message: `${NOTFOUND}`, description: "pool service do not exist in database" });
                else {
                    return res.status(200).send({ message: `${OK}`, poolService });
                }
            });
        } else {
            return res.status(404).send({ message: `${NOTFOUND}`, description: 'incorrect pool service id' });
        }
    };

    async getPoolServices(req, res) {
        PoolService.find({}, (err, poolServices) => {
            if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
            if (!poolServices) return res.status(404).send({ message: `${NOTFOUND}`, description: "pool services does not exist in database" });
            else {
                return res.status(200).send({ message: `${OK}`, poolServices })
            }
        })
    };


    async savePoolService(req, res) {

        let poolService = new PoolService();
        poolService.name = req.body.name;
        poolService.picture = req.body.picture;

        poolService.save((err, poolServiceStored) => {
            if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
            else {
                return res.status(200).send({ message: `${OK}`, poolService: poolServiceStored });
            }
        })
    };

    async updatePoolService(req, res) {
        let psid = req.params.psid;
        let update = req.body;

        if (mongoose.Types.ObjectId.isValid(psid)) {
            PoolService.findOneAndUpdate({ _id: psid }, { $set: update }, { new: true }, (err, poolServiceUpdate) => {
                if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                else {
                    return res.status(200).send({ message: `${OK}`, poolService: poolServiceUpdate });
                }
            });
        } else {
            return res.status(404).send({ message: `${NOTFOUND}`, description: 'incorrect pool service id' })
        }
    };

    async deleteBarberShop(req, res) {
        let psid = req.params.psid;

        if (mongoose.Types.ObjectId.isValid(psid)) {
            PoolService.findById(psid, (err, poolService) => {
                if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                else {
                    poolService.remove(err => {
                        if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` })
                        return res.status(200).send({ message: `${OK}`, description: 'pool service deleted' })
                    });
                }
            });
        } else {
            return res.status(404).send({ message: `${NOTFOUND}`, description: 'incorrect barbershop id' })
        };
    };
}

module.exports = new PoolServiceController();
