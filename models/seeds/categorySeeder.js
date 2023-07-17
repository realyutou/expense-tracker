// Include packages and define related variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
} // Require dotenv only in non-production environment
const db = require('../../config/mongoose')
const Category = require('../category')
const categoryList =[ { name: '家居物業' }, { name: '交通出行' }, { name: '休閒娛樂' }, { name: '餐飲食品' }, { name: '其他' } ] 

db.once('open', () =>{
  Promise.all(Array.from({ length: categoryList.length }, (_, i) => Category.create({ name: categoryList[i].name })))
    .then(() => {
      console.log('Done!')
      process.exit()
    })
})