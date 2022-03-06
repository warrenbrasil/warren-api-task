const { Router } = require('express')
const { getCustomer } = require('../middlewares/getCustomer');
const { PortfolioController } = require('../controllers')

const PortfolioRouter = Router()

PortfolioRouter.get('/get-portfolio-by-id/:id', getCustomer, PortfolioController.getPortfolioById)
PortfolioRouter.get('/goalReached', getCustomer, PortfolioController.getPortfolioWithGoalReached)

module.exports = {
    PortfolioRouter
}