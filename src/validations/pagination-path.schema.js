const Yup = require('yup')
const { VALIDATION_MESSAGE } = require('../utils/messages')
var { ObjectId } = require('mongoose').Types;

const paginationPathSchema = Yup.object().shape({
    page: Yup
        .number()
        .required(VALIDATION_MESSAGE.PAGE_NUMBER_IS_REQUIRED)
        .moreThan(0, VALIDATION_MESSAGE.PAGE_MUST_TO_BE_MORE_THAN_ZERO)
        .test(
            'validate-format',
            VALIDATION_MESSAGE.INVALID_OBJECT_ID_FORMAT,
            (value) => ObjectId.isValid(value)),
    pageSize: Yup
        .number()
        .required(VALIDATION_MESSAGE.PAGE_SIZE_IS_REQUIRED)
        .moreThan(0, VALIDATION_MESSAGE.PAGE_SIZE_MUST_TO_BE_MORE_THAN_ZERO)
        .test(
            'validate-format',
            VALIDATION_MESSAGE.INVALID_OBJECT_ID_FORMAT,
            (value) => ObjectId.isValid(value)),
})

module.exports = {
    paginationPathSchema
}