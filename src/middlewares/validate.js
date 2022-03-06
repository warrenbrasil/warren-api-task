const validatePath = schema => async (req, res, next) => {
  const path = req.query
  await schema.validate(path, { abortEarly: false })
  next()
}

const validateData = (schema) => async (req, res, next) => {
  const data = req.body;
  await schema
    .validate(data, { abortEarly: false })
  next();
};


module.exports = { validateData, validatePath }