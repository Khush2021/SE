const success = (statusCode, result) => {
  return {
    status: "ok",
    statusCode,
    result,
  };
};

// responseWrapper.js
const error = (statusCode, result) => {
  return {
    status: "error",
    statusCode: statusCode,
    result: result,
  };
};
// ... (other code)

module.exports = { error, success };
