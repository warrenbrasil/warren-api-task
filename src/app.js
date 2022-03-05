const express = require('express');
require('express-async-errors')
const { router } = require('./routes')
const { errorHandler } = require('./errors/handler')
const Cors = require('cors')
const { corsConfig } = require('./config')

const app = express();
app.use(express.json());

app.use(Cors(corsConfig));


app.use(router)
app.use(errorHandler)

module.exports = app
