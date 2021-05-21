module.exports = (db) => {
  const CommentSchema = new db.Schema(
    {
      content: { type: String, required: true },
    },
    { timestamps: true },
  )
  console.log('Comments add schema')
  return db.model('Comments', CommentSchema)
}
