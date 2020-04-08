const mongoose = require('mongoose');
const Brand = require('./Brand');

const autoIncrementModelID = require('./Counter');

const VehicleSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  brand: {
    type: { Brand },
    required: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
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
  pictures: [{ base64: { type: String } }],
});

VehicleSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID('Vehicle', this, next);
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
