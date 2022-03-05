const { CustomError } = require('./CustomError')
const { NOT_FOUND } = require('http-status')


class NotFoundError extends CustomError {
    constructor(message) {
        super(NOT_FOUND, message)
        this.message = message
    }
}

module.exports = {
    NotFoundError
}