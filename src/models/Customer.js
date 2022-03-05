const mongoose = require('mongoose')
const { portfolioSchema } = require('./Portfolio')

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  portfolios: [portfolioSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('Customer', customerSchema);
