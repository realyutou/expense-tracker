// Include packages and define related variables
const express = require('express')
const exphbs = require('express-handlebars')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
} // Require dotenv only in non-production environment


require('./config/mongoose')

const routes = require('./routes')

const app = express()
const PORT = process.env.PORT

// Set template engine
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// Set body-parser
app.use(express.urlencoded({ extended: true }))

// 將 request 導入路由器
app.use(routes)

// Start and listen the server
app.listen(PORT, () => {
  console.log(`The app is running on http://localhost:${PORT}`)
})