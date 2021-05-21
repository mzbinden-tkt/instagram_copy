const mongoose = require('mongoose')

const comment = require('../entities/comment.entity')
const user = require('../entities/user.entity')
const post = require('../entities/post.entity')

mongoose.set('useFindAndModify', false)

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOSTNAME, MONGO_PORT, MONGO_DB } = process.env
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

console.log('Mongo connection: ' + url)
let db = {}
mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
  },
  (err) => {
    console.log('MongoDb error: ' + err)
  },
)
db[MONGO_DB] = {}
db[MONGO_DB].conn = mongoose
db[MONGO_DB].Comment = comment(mongoose)
db[MONGO_DB].User = user(mongoose)
db[MONGO_DB].Post = post(mongoose)

exports.db = db[MONGO_DB]
