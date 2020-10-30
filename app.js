'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { HomeRoutes,
    UserRoutes,
    BarberRoutes,
    BarbershopRoutes,
    ScoreRoutes,
    AppoimentRoutes,
    ServiceRoutes,
    PoolServiceRoutes
} = require('./routes');
const { NotFoundMiddleware } = require('./middleware');

const app = express();
app.use(cors());

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/v1.0',
 HomeRoutes,
 UserRoutes,
 BarberRoutes, 
 BarbershopRoutes, 
 ScoreRoutes, 
 AppoimentRoutes,
 ServiceRoutes,
 PoolServiceRoutes);
app.use(NotFoundMiddleware);

module.exports = {
    app
};




