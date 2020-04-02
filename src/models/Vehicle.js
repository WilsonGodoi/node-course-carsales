const mongoose = require('mongoose');
const Brand = require('./Brand');
const User = require('./User');

const VehicleSchema = new mongoose.Schema({
  brand: {
    type: { Brand },
    required: true,
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
    type: String,
    required: true,
  },
  manufactureYear: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    require: true,
  },
  mileage: {
    type: String,
  },
  onlyOwner: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    required: true,
    enum: ['DISPONIVEL', 'RESERVADO', 'VENDIDO'],
    trim: true,
    default: 'DISPONIVEL',
  },
  advertisedValue: {
    type: String,
    required: true,
  },
  salesValue: {
    type: String,
  },
  salesDate: {
    type: Date,
  },
  seller: {
    type: String,
  },
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
