const mongoose = require('mongoose');
const { VehicleStatuses } = require('../enums/vehicle-statuses');

const VehicleSchema = new mongoose.Schema({
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
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
    enum: Object.values(VehicleStatuses),
    trim: true,
    default: VehicleStatuses.AVAILABLE,
  },
  price: {
    type: Number,
    required: true,
  },
  pictures: [{ base64: { type: String } }],
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
