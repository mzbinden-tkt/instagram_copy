const { db } = require('../repositories/mongo.repository')
const userOrm = require('./user.orm')

exports.GetById = async (id) => {
  try {
    return await db.Post.findById(id)
  } catch (err) {
    console.log(' err post.orm.GetById = ', err)
    return { err: { code: 123, messsage: err } }
  }
}

exports.AddComment = async (post, comment) => {
  post.comments.push(comment)
  await post.save()
}

exports.Create = async ({ title, image, description, author }) => {
  try {
    const user = await userOrm.GetById(author)

    if (user.err) {
      return { err: user.err }
    }
    const post = new db.Post({
      title,
      image,
      description,
      author: user,
    })
    await post.save()
    return post
  } catch (err) {
    console.log(' err post.orm.Create = ', err)
    return { err: { code: 123, messsage: err } }
  }
}

exports.GetAll = async (size, page) => {
  try {
    const posts = await db.Post.find()
      .sort('-createdAt')
      .select({ __v: 0 })
      .skip(size * page - size)
      .limit(size)
    const count = await db.Post.find().countDocuments()
    const pages = parseInt(count / size) === 0 ? 1 : parseInt(count / size)
    return { totalPages: pages, posts }
  } catch (err) {
    console.log(' err post.orm.GetAll = ', err)
    return { err: { code: 123, messsage: err } }
  }
}

exports.AddLikes = async (id, { idUser }) => {
  try {
    let post = await db.Post.findOneAndUpdate(id).update({
      $inc: { likes_count: 1 },
      $push: { likes: { _id: idUser } },
    })
    return true
  } catch (err) {
    console.log(' err post.orm.AddLike = ', err)
    return { err: { code: 123, messsage: err } }
  }
}
