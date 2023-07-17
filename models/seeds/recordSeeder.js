// Include packages and define related variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
} // Require dotenv only in non-production environment
const db = require('../../config/mongoose')
const User = require('../user')
const Record = require('../record')
const Category = require('../category')
const userList = [ { name: '廣志' }, { name: '小新' } ]
const recordList = [
  {
    name: '午餐',
    date: '2019-04-23',
    category: '餐飲食品',
    amount: 60
  },
  {
    name: '早餐',
    date: '2019.04.23',
    category: '餐飲食品',
    amount: 60
  },
  {
    name: '捷運',
    date: '2019-04-23',
    category: '交通出行',
    amount: 120
  },
  {
    name: '租金',
    date: '2015-04-01',
    category: '家居物業',
    amount: 25000
  },
  {
    name: '電影：驚奇隊長',
    date: '2019-04-23',
    category: '休閒娛樂',
    amount: 220
  }
]

db.once('open', () => {
  Promise.all(Array.from({ length: recordList.length }, (_, i) => Category.findOne({ name: recordList[i].category })))
    .then((data) => {
      for (let i = 0; i < recordList.length; i++) {
        recordList[i].categoryId = data[i]._id
      }
      return Promise.all(Array.from({ length: userList.length }, (_, i) => User.create({ name: userList[i].name })))
    })
    .then(users => {
      console.log('SEED_USERS are created!')
      for (let i = 0; i < 4; i++) {
        recordList[i].userId = users[0]._id
      }
      recordList[4].userId = users[1]._id
      return recordList
    })
    .then(recordList => {
      return Promise.all(Array.from({ length: recordList.length }, (_, i) => Record.create({
        name: recordList[i].name,
        date: recordList[i].date,
        category: recordList[i].category,
        amount: recordList[i].amount,
        userId: recordList[i].userId,
        categoryId: recordList[i].categoryId
      })))
    })
    .then(() => {
      console.log('SEED_RECORDS are created!')
      process.exit()
    })
})