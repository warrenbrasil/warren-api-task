const Customer = require('../models/Customer');
const { NotFoundError } = require('../errors/NotFoundError');
const ERROR_MESSAGE = require('../utils/messages/error-messages')


const doDeposit = async (customerId, amount) => {
    const customer = await Customer.findOne({ '_id': customerId })

    if (!customer) {
        console.log({customerId})
        throw new NotFoundError(ERROR_MESSAGE.CUSTOMER_NOT_FOUND)
    }

    const balance = customer.balance + amount

    await Customer.updateOne({ '_id': customerId }, { balance })

    Object.assign(customer, { balance: (customer.balance + amount) })

    return customer
}

const getCostumer = async (customerId) =>
    await Customer.findById(customerId)


module.exports = {
    doDeposit,
    getCostumer
}