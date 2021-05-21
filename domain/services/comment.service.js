const logger = require('../../util/logger')
const enum_ = require('../../util/enum')
const commentOrm = require('../orm/comment.orm')

exports.Create = async (req, res) => {
  let status = 'Success',
    errorCode = '',
    message = '',
    data = '',
    statusCode = 0,
    resp = {}
  try {
    respOrm = await commentOrm.CreateCommentInPost(req.params.idPost, req.body)
    if (respOrm.err) {
      status = 'Failure'
      errorCode = respOrm.err.code
      message = respOrm.err.messsage
      statusCode = enum_.CODE_BAD_REQUEST
    } else {
      message = 'Success Response'
      data = respOrm
      statusCode = enum_.CODE_OK
    }
    resp = await logger.ResponseService(status, errorCode, message, data)
    return res.status(statusCode).send(resp)
  } catch (err) {
    console.log('err = ', err)
    resp = await logger.ResponseService('Failure', enum_.CRASH_LOGIC, err, '')
    return res.status(enum_.CODE_INTERNAL_SERVER_ERROR).send(resp)
  }
}

exports.GetById = async (req, res) => {
  let status = 'Success',
    errorCode = '',
    message = '',
    data = '',
    statusCode = 0,
    resp = {}
  try {
    const id = req.params.id
    respOrm = await commentOrm.GetById(id)
    if (respOrm && respOrm.err) {
      status = 'Failure'
      errorCode = respOrm.err.code
      message = respOrm.err.messsage
      statusCode = enum_.CODE_BAD_REQUEST
    } else {
      if (respOrm) {
        message = 'Success Response'
        data = respOrm
        statusCode = enum_.CODE_OK
      } else {
        status = 'Failure'
        errorCode = enum_.ID_NOT_FOUND
        message = 'ID NOT FOUND'
        statusCode = enum_.CODE_NOT_FOUND
      }
    }
    resp = await logger.ResponseService(status, errorCode, message, data)
    return res.status(statusCode).send(resp)
  } catch (err) {
    console.log('err = ', err)
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(await logger.ResponseService('Failure', enum_.CRASH_LOGIC, err, ''))
  }
}
