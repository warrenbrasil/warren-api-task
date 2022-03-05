const Customer = require('../models/Customer');

const getCustomer = async (req, res, next) => {
  const customerId = req.header('customer-id')
  const customer = await Customer.findById(customerId)
  if (!customer) return res.status(401).end()
  req.customer = customer
  next()
}
module.exports = { getCustomer }