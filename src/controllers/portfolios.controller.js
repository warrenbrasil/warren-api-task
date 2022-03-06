const httpStatus = require("http-status")
const { PortfolioService } = require("../services")


const getPortfolioById = async (req, res) => {
    const { id } = req.params
    const portfolio = await PortfolioService.getPortfolioById(id)

    return res.status(httpStatus.OK).json({portfolio})
} 

const getPortfolioWithGoalReached = async (req, res) => {
    const customerId = req.header('customer-id')

    const portfolios = await PortfolioService.getPortfolioWithGoalReached(customerId)
    
    return res.status(httpStatus.OK).json(portfolios)
}

module.exports = {
    getPortfolioById,
    getPortfolioWithGoalReached
}