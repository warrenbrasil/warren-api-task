const express = require('express');
const Customer = require('./models/Customer');
const { getCustomer } = require('./middlewares/getCustomer');
const Transaction = require('./models/Transaction');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

app.get('/portfolios/:id', getCustomer, async (req, res) => {
  const { id } = req.params
  const portfolio = await Customer.findOne({ '_id': id })
  res.json(portfolio)
})

module.exports = app
