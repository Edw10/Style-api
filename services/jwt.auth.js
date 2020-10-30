'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const { SECRET } = require('../config');
const { ERRORTOKEN, ERRORSERVER } = require('./messages');

function createToken(user) {
    const payload = {
        sub: user.nickname,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    }
    return jwt.encode(payload, SECRET);
}

function decodeToken(token) {

    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, SECRET);

            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: `${ERRORTOKEN}`,
                    description: 'token has been expired or revoked'
                });
            }
            resolve(payload.sub);

        } catch (err) {
            reject({
                status: 500,
                message: `${ERRORSERVER}`,
                description: `${ERRORTOKEN}`
            });
        }
    });
    return decoded;
}

module.exports = {
    createToken,
    decodeToken
}