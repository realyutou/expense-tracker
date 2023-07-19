// Include packages and define related variables
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
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

// Set express-session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// Set body-parser
app.use(express.urlencoded({ extended: true }))

// 設定每筆請求都會透過 method-override 處理
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

// Start and listen the server
app.listen(PORT, () => {
  console.log(`The app is running on http://localhost:${PORT}`)
})