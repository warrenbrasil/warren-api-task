const { Router } = require('express')
const { getCustomer } = require('../middlewares/getCustomer');
const { PortfolioController } = require('../controllers')

const PortfolioRouter = Router()

PortfolioRouter.get('/:id', getCustomer, PortfolioController.getPortfolioById)

module.exports = {
    PortfolioRouter
}