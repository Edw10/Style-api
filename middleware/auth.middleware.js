'use strict';

const { NOAUTH } = require('../services/messages');
const services = require('../services/jwt.auth');

module.exports = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send(
            {
                message: `${NOAUTH}`,
                description: 'token required'
            });
    } else {
        const token = req.headers.authorization.split(' ')[1];

        services.decodeToken(token)
            .then(response => {
                req.user = response;
                next();
            })
            .catch(response => {
                res.status(response.status).send({
                    message: response.message,
                    description: response.description
                });
            });
    }
}
