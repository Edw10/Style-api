'use strict';

const User = require('../models/user_model');
const mongoose = require('mongoose');
const service = require('../services/jwt.auth');

const { OK, ERROR, NOTFOUND, ERRORSERVER } = require('../services/messages');

class UserController {

    async getUser(req, res) {
        let uid = req.params.uid;

        if (mongoose.Types.ObjectId.isValid(uid)) {
            User.findById(uid, (err, user) => {
                if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                if (!user) return res.status(404).send({ message: `${NOTFOUND}`, description: "user does not exist in database" });
                else {
                    return res.status(200).send({ message: `${OK}`, user });
                }
            });
        } else {
            return res.status(404).send({ message: `${NOTFOUND}`, description: 'incorrect user id' })
        }
    }

    async getUsers(req, res) {
        User.find({}, (err, users) => {
            if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
            if (!users) return res.status(404).send({ message: `${NOTFOUND}`, description: "users do not exist in database" });
            else {
                return res.status(200).send({ message: `${OK}`, users });
            }
        });
    }


    async updateUser(req, res) {
        let uid = req.params.uid
        let update = req.body

        if (mongoose.Types.ObjectId.isValid(uid)) {
            User.findOneAndUpdate({ _id: uid }, { $set: update }, { new: true }, (err, userUpdate) => {
                if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                else {
                    return res.status(200).send({ message: `${OK}`, user: userUpdate });
                }
            });
        } else {
            return res.status(404).send({ message: `${NOTFOUND}`, description: 'incorrect user id' })
        }
    }

    async deleteUser(req, res) {
        let uid = req.params.uid;

        if (mongoose.Types.ObjectId.isValid(uid)) {
            User.findById(uid, (err, user) => {
                if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                else {
                    user.remove(err => {
                        if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` })
                        return res.status(200).send({ message: `${OK}`, description: 'user deleted' })
                    });
                }
            });
        } else {
            return res.status(404).send({ message: `${NOTFOUND}`, description: 'incorrect user id' })
        };
    }

    async loginUser(req, res) {

        let cellphone = req.body.cellphone;
        let password = req.body.password;

        User.findOne({ cellphone }, (err, user) => {
            if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
            if (!user) return res.status(404).send({ message: `${NOTFOUND}`, description: "user does not exist in database" });
            else {
                return user.comparePassword(password, (err, isMatch) => {
                    if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
                    if (!isMatch) return res.status(404).send({ message: `${NOTFOUND}`, description: "incorrect password" });
                    else {
                        req.user = user;
                        res.status(200).send({
                            message: `${OK}`,
                            description: 'correct login',
                            token: service.createToken(user)
                        });
                    }
                });
            }
        }).select({ password: true });
    }

    async signupUser(req, res) {

        let user = new User();
        user.firstName = req.body.firstName;
        user.secondName = req.body.secondName;
        user.firstLastName = req.body.firstLastName;
        user.secondLastName = req.body.secondLastName;
        user.cellphone = req.body.cellphone;
        user.email = req.body.email;
        user.password = req.body.password;
        user.birthdate = req.body.birthdate;
        user.location = req.body.location;
        user.city = req.body.city;
        user.country = req.body.city;
        user.gender = req.body.city;
        user.picture = req.body.picture;

        user.save((err, userStored) => {
            if (err) return res.status(500).send({ message: `${ERROR}`, description: `${ERRORSERVER}: ${err}` });
            else {
                return res.status(200).send({
                    message: `${OK}`,
                    user: userStored,
                    token: service.createToken(user)
                });
            }
        });
    }

}

module.exports = new UserController();
