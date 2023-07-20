// Include packages and define related variables
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const records = require('./modules/records')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

// 將網址結構符合 '/records' 的 request 傳入 records 模組
router.use('/records', authenticator, records)

// 將網址結構符合 '/users' 的 request 傳入 users 模組
router.use('/users', users)

// 將網址結構符合 '/' 的 request 傳入 home 模組
router.use('/', authenticator, home)

// 匯出路由器
module.exports = router
