const { CustomError } = require('./CustomError')
const { UNAUTHORIZED } = require('http-status')
const {ERROR_MESSAGE} = require('../utils/messages')

class PortfolioBelongAAnotherUserError extends CustomError {
    constructor() {
        super(UNAUTHORIZED, ERROR_MESSAGE.THIS_PORTFOLIO_DOESNT_BELONG_TO_YOU)
    }
}

module.exports = {
    PortfolioBelongAAnotherUserError
}