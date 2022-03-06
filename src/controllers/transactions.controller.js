const httpStatus = require("http-status")
const { TransactionService } = require('../services')

const getDeposits = async (req, res) => {
    const { status, start, end } = req.query

    const transactions = await TransactionService.getDeposits(status, start, end)

    return res.status(httpStatus.OK).json(transactions)
}


const doDeposit = async (req, res) => {
    const customerId = req.header('customer-id')
    const { amount } = req.body

    const customer = await TransactionService.doDeposit(customerId, amount)

    return res.status(httpStatus.CREATED).json({ customer })
}

const transferBetweenAccounts = async (req, res) => {
    const customer = await req.customer
    const { customerId } = req.params
    const { amount } = req.body

    const transaction = await TransactionService.transferBetweenAccounts(customer, customerId, amount)

    return res.status(httpStatus.CREATED).json({ transaction })
}

const transferBetweenPortfolios = async (req, res) => {
    const customerId = req.header('customer-id')
    const { fromPortfolio, toPortfolio } = req.query
    const { amount } = req.body

    const transaction = await TransactionService
        .transferBetweenPortfolios({
            customerId,
            fromPortfolioId: fromPortfolio,
            toPortfolioId: toPortfolio,
            amount
        })

    return res.status(httpStatus.CREATED).json(transaction)
}

module.exports = {
    getDeposits,
    doDeposit,
    transferBetweenAccounts,
    transferBetweenPortfolios
}