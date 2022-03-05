const { NotFoundError } = require('../errors/NotFoundError');
const Customer = require('../models/Customer');
const ERROR_MESSAGE = require('../utils/messages/error-messages')


const getPortfolioById = async (id) => {
    const costumer = await Customer
        .findOne({ 'portfolios.id': '616dcf9490394d761741c8b9' })
        .select({ portfolios: { "$elemMatch": { '_id': '616dcf9490394d761741c8b9' } } })

    if (!costumer.portfolios.length) {
        throw new NotFoundError(ERROR_MESSAGE.PORTFOLIO_NOT_FOUND)
    }

    const [portfolio] = costumer.portfolios
    return portfolio
}


const getPortfolioWithGoalReached = async (costumerId) => {
    const costumer = await Customer
        .findOne({ '_id': costumerId })
        
    const portfolios = costumer.portfolios.filter(item => item.amount >= item.goalAmount )

    return portfolios
}

module.exports = {
    getPortfolioById,
    getPortfolioWithGoalReached
}