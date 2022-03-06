const { Router } = require('express')
const { getCustomer, validatePath, validateData } = require('../middlewares');
const { TransactionController } = require('../controllers')
const { depositPathSchema, doDepositSchema, transactionBetweenPortfolioPathSchema } = require('../validations')


const TransactionRouter = Router()

TransactionRouter.get(
    '/deposits',
    getCustomer,
    validatePath(depositPathSchema),
    TransactionController.getDeposits
)

TransactionRouter.post(
    '/deposit',
    getCustomer,
    validateData(doDepositSchema),
    TransactionController.doDeposit
)

TransactionRouter.post(
    '/account-transfer/:customerId',
    getCustomer,
    validateData(doDepositSchema),
    TransactionController.transferBetweenAccounts
)


TransactionRouter.post(
    '/portfolio-transfer',
    getCustomer,
    validatePath(transactionBetweenPortfolioPathSchema),
    validateData(doDepositSchema),
    TransactionController.transferBetweenPortfolios
)



module.exports = {
    TransactionRouter
}