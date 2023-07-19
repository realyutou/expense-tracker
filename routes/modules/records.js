// Include packages and define related variables
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const User = require('../../models/user')

// Set routes
// 使用者可以依類別篩選支出紀錄
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
        .catch(console.error)
        })
    })
})

// 使用者可以新增支出紀錄
// 新增支出表單頁面
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, date, category, amount, user } = req.body
  Category.findOne({ name: category })
    .then(category => {
      const categoryId = category._id
      const categoryIcon = category.icon
      return User.findOne({ name: user })
        .then(user => {
          const userId = user._id
          return Record.create({ name, date, category, categoryIcon, amount, userId, categoryId })
            .then(() => res.redirect('/'))
            .catch(console.error)
        })
    })
})

// 匯出 records 路由模組
module.exports = router