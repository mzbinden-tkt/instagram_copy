const { db } = require('../repositories/mongo.repository')
const { GetById, AddComment } = require('./post.orm')

exports.CreateCommentInPost = async (idPost, { content }) => {
  try {
    const res = await GetById(idPost)

    if (res.err) {
      return { err: res.err }
    }

    const comment = new db.Comment({
      content,
    })
    await comment.save()

    await AddComment(res, comment)

    return true
  } catch (err) {
    console.log(' err comment.orm.CreateCommentInPost = ', err)
    return await { err: { code: 123, messsage: err } }
  }
}

exports.GetById = async (id) => {
  try {
    return await db.Comment.findById(id)
  } catch (err) {
    console.log(' err comment.orm.GetById = ', err)
    return { err: { code: 123, messsage: err } }
  }
}
