const { Router } = require('express')
const {HealthCheckRouter} = require('./health-check.router')
const {PortfolioRouter} = require('./portfolio.router')
const {TransactionRouter} = require('./transaction.router')
const {AdminRouter} = require('./admin.router')

const router = Router()

router.use('/health-check', HealthCheckRouter)
router.use('/portfolios', PortfolioRouter)
router.use('/transactions', TransactionRouter)
router.use('/admin', AdminRouter)


module.exports = {
    router
}