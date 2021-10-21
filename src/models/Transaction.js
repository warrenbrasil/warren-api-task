const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  _customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['deposit', 'withdraw', 'account_transfer', 'portfolio_deposit', 'portfolio_transfer', 'portfolio_withdraw']
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'accepted', 'rejected', 'deleted']
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  },
  fromPortfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio'
  },
  toPortfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio'
  },
  toCustomer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
