const Yup = require('yup')
const { VALIDATION_MESSAGE } = require('../utils/messages')
var { ObjectId } = require('mongoose').Types;

const transactionBetweenPortfolioPathSchema = Yup.object().shape({
    fromPortfolio: Yup
        .string()
        .required(VALIDATION_MESSAGE.PORTFOLIO_ID_IS_REQUIRED)
        .test(
            'validate-format',
            VALIDATION_MESSAGE.INVALID_OBJECT_ID_FORMAT,
            (value) => ObjectId.isValid(value)),
    toPortfolio: Yup
        .string()
        .required(VALIDATION_MESSAGE.PORTFOLIO_ID_IS_REQUIRED)
        .test(
            'validate-format',
            VALIDATION_MESSAGE.INVALID_OBJECT_ID_FORMAT,
            (value) => ObjectId.isValid(value)),
})

module.exports = {
    transactionBetweenPortfolioPathSchema
}