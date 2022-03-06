const { NotFoundError } = require('../errors/NotFoundError');
const Customer = require('../models/Customer');
const ERROR_MESSAGE = require('../utils/messages/error-messages')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types



const getPortfolioById = async (id) => {
    const costumer = await Customer
        .findOne({ 'portfolios.id': id })
        .select({ portfolios: { "$elemMatch": { '_id': id } } })

    if (!costumer.portfolios.length) {
        throw new NotFoundError(ERROR_MESSAGE.PORTFOLIO_NOT_FOUND)
    }

    const [portfolio] = costumer.portfolios
    return portfolio
}


const getPortfolioWithGoalReached = async (costumerId) => {
    const costumer = await Customer
        .findOne({ '_id': costumerId })

    const portfolios = costumer.portfolios.filter(item => item.amount >= item.goalAmount)

    return portfolios
}

const deposit = async (portfolioId, amount) => {
    const customer = await Customer.findOne({ 'portfolios.id': portfolioId })
        .select({ portfolios: { "$elemMatch": { '_id': portfolioId } } })

    const [portfolio] = customer.portfolios

    const newAmount = portfolio.amount + amount

    await Customer
        .updateOne(
            { '_id   ': customer._id, portfolios: { '$elemMatch': { '_id': portfolioId } } },
            { '$set': { 'portfolios.$.amount': newAmount } }
        )

    Object.assign(portfolio, { amount: newAmount })

    return portfolio
}

module.exports = {
    getPortfolioById,
    getPortfolioWithGoalReached,
    deposit

}