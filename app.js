// Include packages and define related variables
const express = require('express')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
} // Require dotenv only in non-production environment

const routes = require('./routes')

const app = express()
const PORT = process.env.PORT

// 將 request 導入路由器
app.use(routes)

// Start and listen the server
app.listen(PORT, () => {
  console.log(`The app is running on http://localhost:${PORT}`)
})