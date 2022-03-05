const httpStatus = require("http-status")
const { PortfolioService } = require("../services")


const getPortfolioById = async (req, res) => {
    const { id } = req.params
    const portfolio = await PortfolioService.getPortfolioById(id)

    return res.status(httpStatus.OK).json({portfolio})
} 


module.exports = {
    getPortfolioById
}