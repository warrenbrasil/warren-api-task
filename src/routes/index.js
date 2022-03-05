const { Router } = require('express')
const {HealthCheckRouter} = require('./health-check.router')
const {PortfolioRouter} = require('./portfolio.router')

const router = Router()

router.use('/health-check', HealthCheckRouter)
router.use('/portfolios', PortfolioRouter)


module.exports = {
    router
}