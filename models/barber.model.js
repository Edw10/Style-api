'use strict';

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const BarberSchema = Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true
        },
        secondName: {
            type: String,
            trim: true
        },
        firstLastName: {
            type: String,
            trim: true,
            required: true
        },
        secondLastName: {
            type: String,
            trim: true
        },
        age: {
            type: Number,
            trim: true,
            required: true
        },
        gender: {
            type: String,
            trim: true,
            required: true
        },
        city: {
            type: String,
            trim: true,
            required: true
        },
        country: {
            type: String,
            trim: true,
            required: true
        },
        cellphone: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            dropDups: true
        },
        email:{
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true,
            dropDups: true
        },
        image:{
            type: String,
            trim: true,
            required: true
        },
        hasAuth: {
            type: Boolean,
            default: false
        },
        starHour:{
            type: Date,
            required: true
        },
        finalHour:{
            type: Date,
            required: true
        },
        description: {
            type: String,
            require: true
        }
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);
BarberSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Barber', BarberSchema);