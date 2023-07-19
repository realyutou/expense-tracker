// Include packages and define related variables
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// Set routes
router.get('/category/:category', (req, res) => {
  const keyCategory = req.params.category
  let totalAmount = 0
  Record.find({ category: keyCategory })
    .lean()
    .then(records => {
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
        records[i].date = records[i].date.toDateString()
      }
      return records
    })
    .then(records => {
      Category.find()
        .lean()
        .then(category => {
          res.render('index', { keyCategory, category, records, totalAmount })
        })
    })
})

// 匯出 home 路由模組
module.exports = router