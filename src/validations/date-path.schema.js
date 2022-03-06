const Yup = require('yup')
const { VALIDATION_MESSAGE } = require('../utils/messages')


const datePathSchema = Yup.object().shape({
    start: Yup
        .string()
        .required(VALIDATION_MESSAGE.DATE_START_IS_REQUIRED)
        .test(
            'vaidate-format',
            VALIDATION_MESSAGE.DATE_INVALID_FORMAT,
            (value) => !isNaN(new Date(value)
            )),
    end: Yup
        .string()
        .required(VALIDATION_MESSAGE.DATE_END_IS_REQUIRED)
        .test(
            'vaidate-format',
            VALIDATION_MESSAGE.DATE_INVALID_FORMAT,
            (value) => !isNaN(new Date(value)
            )),
})

module.exports = {
    datePathSchema
}