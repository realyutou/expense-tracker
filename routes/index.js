// Include packages and define related variables
const express = require('express')
const router = express.Router()
const home = require('./modules/home')

// 將網址結構符合 '/' 的 request 傳入home模組
router.use('/', home)

// 匯出路由器
module.exports = router