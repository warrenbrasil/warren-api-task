const Yup = require('yup')
const { VALIDATION_MESSAGE } = require('../utils/messages')


const depositPathSchema = Yup.object().shape({
    status: Yup.string().required(VALIDATION_MESSAGE.STATUS_IS_REQUIRED),
})

module.exports = {
    depositPathSchema
}