const httpStatus = require("http-status")
const { CustomerService, TransactionService } = require('../services')


const topAllocationAmount = async (req, res) => {
    const { page: pageStr, pageSize: pageSizeStr } = req.query

    const page = Number(pageStr)
    const pageSize = Number(pageSizeStr)

    const customers = await CustomerService.topAllocationAmount(page, pageSize)

    return res.status(httpStatus.OK).json({ customers, page, limit: pageSize })
}

const topCashChurn = async (req, res) => {
    const {
        page: pageStr,
        pageSize: pageSizeStr,
        start,
        end
    } = req.query

    const page = Number(pageStr)
    const pageSize = Number(pageSizeStr)

    const costumers = await TransactionService.topCashChurn({page, pageSize, start, end})


    return res.status(httpStatus.OK).json({
        costumers,
        page,
        pageSize
    })
}


module.exports = {
    topAllocationAmount,
    topCashChurn
}