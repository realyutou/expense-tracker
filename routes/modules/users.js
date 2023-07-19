// Include packages and define related variables
const express = require('express')
const router = express.Router()
const User = require('../../models/user')

// Set routes
// 使用者可以註冊帳號
// 註冊表單頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 送出註冊表單
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('User already exist.')
        return res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      }
      return User.create({ name, email, password })
        .then(() => res.redirect('/'))
    })
    .catch(console.error)
})

// 使用者可以登入帳號
// 登入表單頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 送出登入表單
router.post('/login', (req, res) => {
  res.redirect('/')
})

// 匯出 users 路由模組
module.exports = router