const Transaction = require('../models/Transaction');
const { TRANSACTION_TYPE, STATUS } = require('../utils');
const CustomerService = require('./customer.service');
const PortfolioService = require('./portfolios.service');
const { BalanceError } = require('../errors/BalanceError')
const { PortfolioBelongAAnotherUserError } = require('../errors/PortfolioBelongAAnotherUserError')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types
const { ORDER_BY } = require('../utils')


const MIN_VALUE_OF_BALANCE = 0


const makeDefaultPropertiesToTransactionCreation = (customerId, amount) => {
	return {
		amount,
		_id: ObjectId(),
		_customer: ObjectId(customerId),
		createdAt: new Date(),
		updatedAt: new Date()

	}
}

const getDeposits = async (status, start, end) => {
	const transactions = Transaction.find({
		status,
		type: TRANSACTION_TYPE.DEPOSIT,
		createdAt: {
			$gte: new Date(start),
			$lte: new Date(end)
		}
	})
	return transactions
}

const doDeposit = async (customerId, amount) => {
	const transaction = Transaction.create({
		...makeDefaultPropertiesToTransactionCreation(customerId, amount),
		type: TRANSACTION_TYPE.DEPOSIT,
		status: STATUS.ACCEPTED,
	})

	await CustomerService.doDeposit(customerId, amount)

	return transaction
}

const transferBetweenAccounts = async (customer, customerId, amount) => {
	const afterDeposit = customer.balance - amount

	if (afterDeposit < MIN_VALUE_OF_BALANCE) {
		await Transaction.create({
			...makeDefaultPropertiesToTransactionCreation(customer._id, amount),
			type: TRANSACTION_TYPE.ACCOUNT_TRANSFER,
			status: STATUS.REJECTED,
		})
		throw new BalanceError()
	}

	await CustomerService.doDeposit(customer._id, -amount)

	const transaction = await Transaction.create({
		...makeDefaultPropertiesToTransactionCreation(customer._id, amount),
		type: TRANSACTION_TYPE.ACCOUNT_TRANSFER,
		status: STATUS.ACCEPTED,
	})

	await CustomerService.doDeposit(customerId, amount)

	return transaction
}

const transferBetweenPortfolios = async ({
	customerId,
	fromPortfolioId,
	toPortfolioId,
	amount
}) => {
	const customer = await CustomerService.getCostumer(customerId)
	const { portfolios } = customer
	const originPortfolio = portfolios.find(item => item._id == fromPortfolioId)
	const destinationPortfolio = portfolios.find(item => item._id == toPortfolioId)

	const transactionData = {
		type: TRANSACTION_TYPE.ACCOUNT_TRANSFER,
		status: STATUS.REJECTED,
		toPortfolio: ObjectId(toPortfolioId),
	}

	if (!originPortfolio || !destinationPortfolio) {
		await Transaction.create({
			...makeDefaultPropertiesToTransactionCreation(customer._id, amount),
			...transactionData
		})
		throw new PortfolioBelongAAnotherUserError()
	}

	const afterDeposit = originPortfolio.amount - amount

	if (afterDeposit < MIN_VALUE_OF_BALANCE) {
		await Transaction.create({
			...makeDefaultPropertiesToTransactionCreation(customer._id, amount),
			...transactionData
		})
		throw new BalanceError()
	}

	const originPortfolioUpdated = await PortfolioService.deposit(fromPortfolioId, -amount)

	await Transaction.create({
		...makeDefaultPropertiesToTransactionCreation(customer._id, amount),
		...transactionData,
		status: STATUS.ACCEPTED
	})

	const destinationPortfolioUpdated = await PortfolioService.deposit(toPortfolioId, amount)

	return [originPortfolioUpdated, destinationPortfolioUpdated]
}

const topCashChurn = async ({ page, pageSize, start, end }) => {


	const transactions = await Transaction
		.aggregate([
			{
				'$match': {
					type: TRANSACTION_TYPE.WITHDRAW,
					status: STATUS.ACCEPTED,
					createdAt: {
						'$gte': new Date(start),
						'$lte': new Date(end)
					}
				}
			},
			{
				"$lookup": {
					"from": "customers",
					"localField": "_customer",
					"foreignField": "_id",
					"as": "customerDetails"
				}
			},
			{
				"$unwind": "$customerDetails"
			},
			{
				'$group': {
					'_id': '$customerDetails._id',
					'totalAmount': { '$sum': '$amount' },
					'firstName': { '$addToSet': '$customerDetails.firstName' },
					'lastName': { '$addToSet': '$customerDetails.lastName' }
				}
			},
			{
				"$set": {
					"firstName": { '$first': '$firstName' },
					"lastName": { '$first': '$lastName' },
				}
			},
			{
				"$sort": { "totalAmount": ORDER_BY.DESC }
			},
			{ '$skip': (--page) * pageSize },
			{ '$limit': pageSize },
		])

	return transactions
}


module.exports = {
	getDeposits,
	doDeposit,
	transferBetweenAccounts,
	transferBetweenPortfolios,
	topCashChurn
}