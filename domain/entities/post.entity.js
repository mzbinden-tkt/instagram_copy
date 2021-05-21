module.exports = (db) => {
  const PostSchema = new db.Schema(
    {
      title: { type: String, required: true },
      image: { type: Buffer, required: true },
      description: { type: String, required: false },
      comments: [{ type: db.Schema.Types.ObjectId, ref: 'Comments' }],
      author: { type: db.Schema.Types.ObjectId, ref: 'Users', required: true },
      likes_count: { type: Number },
      likes: [{ type: db.Schema.Types.ObjectId, ref: 'Users' }],
    },
    { timestamps: true },
  )
  console.log('Posts add schema')
  return db.model('Posts', PostSchema)
}
