const uniqueValidator = require('mongoose-unique-validator')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const SECRET = '12345klkaka'

module.exports = (db) => {
  const UserSchema = new db.Schema(
    {
      username: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true,
        unique: true,
      },
      email: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
      },
      password: { type: String, required: true },
      hash: { type: String },
      salt: { type: String },
      token: { type: String },
    },
    { timestamps: true },
  )
  UserSchema.plugin(uniqueValidator, { message: 'is already taken.' })

  UserSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  }

  UserSchema.methods.validPassword = (password) => {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
    return this.hash === hash
  }

  UserSchema.methods.generateJWT = function () {
    const today = new Date()
    let exp = new Date(today)
    exp.setDate(today.getDate() + 60)
    this.token = jwt.sign(
      {
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
      },
      SECRET,
    )
  }
  console.log('Users add schema')
  return db.model('Users', UserSchema)
}
