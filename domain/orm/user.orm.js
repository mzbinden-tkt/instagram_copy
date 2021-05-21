const { db } = require('../repositories/mongo.repository')
const Types = require('mongoose').Types

exports.GetById = async (id) => {
  try {
    return await db.User.findById(id)
  } catch (err) {
    console.log(' err user.orm.GetById = ', err)
    return { err: { code: 123, messsage: err } }
  }
}

exports.Create = async ({ username, password, email }) => {
  try {
    const user = new db.User({
      username,
      password,
      email,
    })
    await user.save()
    user.generateJWT()
    return { id: user._id, token: user.token }
  } catch (err) {
    console.log(' err user.orm.Create = ', err)
    return { err: { code: 123, messsage: err } }
  }
}

exports.GetPosts = async (id) => {
  try {
    const user = await db.User.findById(id)
    if (!user) {
      return user
    }
    const posts = await db.Post.find({
      author: Types.ObjectId(id),
    })
      .populate('comments', 'content')
      .populate('author', 'username')
      .populate('likes', 'username')
    return { posts }
  } catch (err) {
    console.log(' err user.orm.GetPosts = ', err)
    return { err: { code: 123, messsage: err } }
  }
}
