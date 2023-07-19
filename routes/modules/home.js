// Include packages and define related variables
const express = require('express')
const router = express.Router()
const Category = require('../../models/category')
const Record = require('../../models/record')

// Set routes
router.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .then(records => {
      for (let i = 0; i < records.length; i++) {
        totalAmount += records[i].amount
        records[i].date = records[i].date.toDateString()
      }
      recordList = records
      return records
    })
    .then(records => {
      Category.find()
        .lean()
        .then(category => {
          res.render('index', { category, records, totalAmount })
        })
    })
})

// 匯出 home 路由模組
module.exports = router
