'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const BarbershopSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            dropDups: true
        },
        location: {
            type: {
              type: String, 
              enum: ['Point'],
              trim: true,
              required: true
            },
            coordinates: {
              type: [Number],
              required: true
            }
          },
          city: {
            type: String,
            required: true,
            trim: true
          },
          country: {
            type: String,
            required: true,
            trim: true
          },
          description:{
            type: String,
            required: true
          },
          fundationDate:{
              type: Date,
              required: true,
              trim: true
          },
          openHour:{
            type: Date,
            required: true,
            trim: true
          },
          closeHour:{
            type: Date,
            required: true,
            trim: true
          },
          status:{
              type: Boolean,
              required: true,
              trim: true
          },
          cellphone:{
              type: String,
              required: true,
              trim: true,
              unique: true,
              dropDups: true
          },
          email:{
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            required: true,
            dropDups: true
          },
          webpage:{
              type: String,
              required: true,
              unique: true,
              trim: true,
              dropDups: true
          },
          picture:{
            type: String,
            required: true,
            trim: true
          }
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);
BarbershopSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Barbershop', BarbershopSchema);