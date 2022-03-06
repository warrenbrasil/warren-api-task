const { Router } = require('express')
const { getCustomer, validatePath } = require('../middlewares');
const { AdminController } = require('../controllers')
const { paginationPathSchema, datePathSchema } = require('../validations')


const AdminRouter = Router()

AdminRouter.get(
    '/topAllocationAmount',
    getCustomer,
    validatePath(paginationPathSchema),
    AdminController.topAllocationAmount
)

AdminRouter.get(
    '/topCashChurn',
    getCustomer,
    validatePath(paginationPathSchema),
    validatePath(datePathSchema),
    AdminController.topCashChurn
)


module.exports = {
    AdminRouter
}