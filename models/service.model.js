'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
    {
        barbershop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Barbershop',
            required: true
        },
        name: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PoolService',
            required: true
        },
        price:{
            type: Number,
            required: true,
            trim: true
        },
        duration:{
            type: Date,
            required: true
        },
        description:{
            type: String,
            required: true
        }
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model('Service', ServiceSchema);