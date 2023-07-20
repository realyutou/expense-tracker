// Include packages and define related variables
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
} // Require dotenv only in non-production environment

const usePassport = require('./config/passport')
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

// 呼叫 Passport 函式並傳入 app
usePassport(app)

// Set connect-flash
app.use(flash())

// 設定 res.locals (所有 view 都能存取的資料)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// 將 request 導入路由器
app.use(routes)

// Start and listen the server
app.listen(PORT, () => {
  console.log(`The app is running on http://localhost:${PORT}`)
})