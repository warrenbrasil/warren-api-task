const Customer = require('../models/Customer');
const { NotFoundError } = require('../errors/NotFoundError');
const ERROR_MESSAGE = require('../utils/messages/error-messages')
const { ORDER_BY } = require('../utils')

const doDeposit = async (customerId, amount) => {
	const customer = await Customer.findOne({ '_id': customerId })

	if (!customer) {
		throw new NotFoundError(ERROR_MESSAGE.CUSTOMER_NOT_FOUND)
	}

	const balance = customer.balance + amount

	await Customer.updateOne({ '_id': customerId }, { balance })

	Object.assign(customer, { balance: (customer.balance + amount) })

	return customer
}

const getCostumer = async (customerId) =>
	await Customer.findById(customerId)


const topAllocationAmount = async (page, pageSize) => {
	const customers = await Customer.aggregate([
		{
			"$addFields": {
				"totalAllocated": {
					"$reduce": {
						input: "$portfolios",
						initialValue: 0,
						in: {
							$add: ["$$value", "$$this.amount"]
						}
					}
				}
			}
		},
		{
			"$sort": { "totalAllocated": ORDER_BY.DESC }
		},
		{ '$skip': (--page) * pageSize },
		{ '$limit': pageSize },
	])

	return customers
}


module.exports = {
	doDeposit,
	getCostumer,
	topAllocationAmount,
}