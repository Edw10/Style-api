'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new Schema(
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
        cellphone: {
            type: String,
            unique: true,
            trim: true,
            required: true,
            dropDups: true
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            required: true,
            dropDups: true
        },
        password: {
            type: String,
            select: false,
            required: true
        },
        birthdate: {
            type: Date,
            required: true,
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
        city:{
            type: String,
            trim: true,
            required: true
        },
        country:{
            type: String,
            trim: true,
            required: true
        },
        gender:{
            type: String,
            trim: true
        },
        picture: {
            type: String,
            required: true
        },
        favBarbershop:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Barbershop'
        }],
        is_active: {
            type: Boolean,
            default: true,
            required: true
        }
    },
    { timestamps: { createdAt: true, updatedAt: true } }
);

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next();

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch)
    });
}
module.exports = mongoose.model('User', UserSchema);