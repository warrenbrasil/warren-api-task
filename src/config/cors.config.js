const httpStatus = require("http-status")
const CORSError = require("../errors/cors-error")

const permissionList = ["http://localhost:3000"];

const corsConfig = {
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  origin: (origin, callback) => {
    if (!origin) return callback(null, false);
    if (permissionList.includes(origin)) return callback(null, true);
    return callback(
      new CORSError(httpStatus.METHOD_NOT_ALLOWED, "U are impostor")
    );
  },
};

module.exports = {
  corsConfig
}