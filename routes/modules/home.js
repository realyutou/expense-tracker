// Include packages and define related variables
const express = require('express')
const router = express.Router()

// Set routes
router.get('/', (req, res) => {
  res.render('index')
})

// 匯出 home 路由模組
module.exports = router