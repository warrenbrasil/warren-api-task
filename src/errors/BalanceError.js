const { CustomError } = require('./CustomError')
const { UNAUTHORIZED } = require('http-status')
const {ERROR_MESSAGE} = require('../utils/messages')

class BalanceError extends CustomError {
    constructor() {
        super(UNAUTHORIZED, ERROR_MESSAGE.BALANCE_CANT_BE_NEGATIVE)
    }
}

module.exports = {
    BalanceError
}