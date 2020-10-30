'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const PoolServiceSchema = Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
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
PoolServiceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('PoolService', PoolServiceSchema);