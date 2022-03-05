const validateData = (schema) => async (req, res, next) => {
  const data = req.body;
  await schema
    .validate(data, { abortEarly: false })
  next();
};


module.exports = {validateData}