const enum_ = require('./enum')
//TODO: ADD LOGGER

exports.LogSuccess = (msg) => {
  console.log(enum_.GREEN_LOG, msg)
}
exports.LogInfo = (msg) => {
  console.log(enum_.CYAN_LOG, msg)
}
exports.LogWarning = (msg) => {
  console.log(enum_.YELLOW_LOG, msg)
}
exports.LogDanger = (msg) => {
  console.log(enum_.RED_LOG, msg)
}

exports.ResponseService = (status, code, message, data) => {
  return { status: status, res: { error: code, message: message, data: data } }
}
