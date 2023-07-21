// Include packages and define related variables
const mongoose = require('mongoose')

// Set MongoDB connection
mongoose.connect(process.env.MONGODB_URI)

// Access MOngoDB connecting situation
const db = mongoose.connection

db.on('error', () => {
  console.log('MongoDB error!')
})

db.once('open', () => {
  console.log('MongoDB connected!')
})

module.exports = db
