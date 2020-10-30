'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Score = [1,2,3,4,5,6,7,8,9,10];

const ScoreBarbershopSchema = Schema(
    {
        rating: {
            type: Number,
            enum: Score,
            required: true,
            trim: true
        },
        review: {
            type: String
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        barbershop: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Barbershop'
        }
    }
);

module.exports = mongoose.model('scoreBarbershop', ScoreBarbershopSchema)