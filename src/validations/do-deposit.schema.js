const Yup = require('yup')
const { VALIDATION_MESSAGE } = require('../utils/messages')


const doDepositSchema = Yup.object().shape({
    amount: Yup
        .number()
        .required(VALIDATION_MESSAGE.AMOUNT_IS_REQUIRED)
        .moreThan(0, VALIDATION_MESSAGE.AMOUNT_MUST_TO_BE_MORE_THAN_ZERO)
})

module.exports = {
    doDepositSchema
}