const mongoose = require('mongoose');
const Brand = require('./Brand');
const User = require('./User');

const VehicleSchema = new mongoose.Schema({
    brand: {
        type: Brand,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    active: {
        type: Boolean,
        default: false,
    },
    modelYear: {
        type: Number,
        required: true,
    },
    manufactureYear: {
        type: Number,
        required: true,
    },
    color:
    {
        type: String,
        require: true,
    },
    mileage: {
        type: BigInt,
    },
    onlyOwner: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        required: true,
        enum: ['DISPONIVEL', 'RESERVADO', 'VENDIDO'],
        trim: true,
    },
    advertisedValue: {
        type: Number,
        required: true,
    },
    salesValue: {
        type: Number,
    },
    salesDate: {
        type: Date,
    },
    seller: {
        type: User
    }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
