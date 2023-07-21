// Include packages and define related variables
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})

// 匯出 category model
module.exports = mongoose.model('Category', categorySchema)
