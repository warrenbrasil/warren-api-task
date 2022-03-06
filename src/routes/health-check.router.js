const { Router } = require('express')
const httpStatus = require('http-status')

const HealthCheckRouter = Router()

HealthCheckRouter.get('/', (_, res) => {
    return res.status(httpStatus.OK).json({
        message: "I'm working"
    })
})

module.exports = {
    HealthCheckRouter
}