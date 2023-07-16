// Include packages and define related variables
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

// 匯出 User model
module.exports = mongoose.model('User', userSchema)