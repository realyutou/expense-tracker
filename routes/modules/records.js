// Include packages and define related variables
const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

// Set routes
// 使用者可以依類別篩選支出紀錄
router.get('/category/:category', (req, res) => {
  const keyCategory = req.params.category
  const userId = req.user._id
  let totalAmount = 0
  Record.find({ category: keyCategory, userId })
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
        .then(category => res.render('index', { keyCategory, category, records, totalAmount }))
        .catch(console.error)
    })
})

// 使用者可以新增支出紀錄
// 新增支出表單頁面
router.get('/new', (req, res) => {
  res.render('new')
})

// 送出新支出資料
router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  const errors = []
  if (!name || !date || !category || !amount) {
    errors.push({ message: '所有欄位都是必填。' })
    return res.render('new', {
      errors,
      name,
      date,
      category,
      amount
    })
  }
  Category.findOne({ name: category })
    .then(data => {
      const categoryId = data._id
      return Record.create({ name, date, category, categoryIcon: data.icon, amount, userId, categoryId })
    })
    .then(() => res.redirect('/'))
    .catch(console.error)
})

// 使用者可以編輯一筆支出紀錄
// 編輯支出表單頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const recordId = req.params.id
  Record.findOne({ _id: recordId, userId })
    .lean()
    .then(record => {
      let date = record.date
      const year = date.getFullYear().toString()
      const month = ('0' + (date.getMonth() + 1).toString()).slice(-2)
      const day = ('0' + date.getDate().toString()).slice(-2)
      date = `${year}-${month}-${day}`
      return res.render('edit', { record, recordId, date })
    })
    .catch(console.error)
})

// 送出編輯後的資料
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  const recordId = req.params.id
  const errors = []
  if (!name || !date || !category || !amount) {
    const record = req.body
    errors.push({ message: '所有欄位都是必填。' })
    return res.render('edit', {
      errors,
      date,
      recordId,
      record
    })
  }
  Record.findOne({ _id: recordId, userId })
    .then(record => {
      record.name = name
      record.date = date
      record.category = category
      record.amount = amount
      return Category.findOne({ name: category })
        .then(category => {
          record.categoryIcon = category.icon
          return record.save()
        })
        .then(() => res.redirect('/'))
        .catch(console.error)
    })
})

// 使用者可以刪除一筆支出紀錄
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const recordId = req.params.id
  return Record.findOneAndRemove({ _id: recordId, userId })
    .then(() => res.redirect('/'))
    .catch(console.error)
})

// 匯出 records 路由模組
module.exports = router
