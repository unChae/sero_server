module.exports = (res, status, message, data) => {
  let response_data = {
    status,
    message,
    data
  }
  res.status(status).json(response_data);
}