'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppoimentSchema = new Schema(
    {
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        barber:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Barber',
            required: true
        },
        barbershop:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Barbershop',
            required: true
        },
        dateTime:{
            type: Date,
            required: true
        },
        status:{
            type: Boolean,
            required: true,
            trim: true
        },
        statusPayment:{
            type: Boolean,
            required: true,
            trim: true
        }
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);

module.exports = mongoose.model('Appoiment', AppoimentSchema);