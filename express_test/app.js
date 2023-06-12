const express = require('express')
// const mongoose = require('mongoose')
const app = express()
const port = 3000

const { mongoose } = require('./db.js')


// main().catch(err => console.log(err))
// async function main() {
//   await mongoose.connect("mongodb://localhost/test")
// }

// async function connectToDatabase() {
//   try {
//     await mongoose.connect('mongodb://127.0.0.1:27017/test');
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Failed to connect to MongoDB:', error);
//   }
// }

// connectToDatabase();

// mongoose.connect('mongodb://127.0.0.1:27017/test').then(()=> {
//   console.log('connected to mongodb')
// }).catch(err => {
//   console.log('failed to connect to MongoDB', err)
// })


let kittySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: '匿名'
  },
  gender: {
    type: String,
    enum: ['男', '女']   // 枚举验证
  },
  age: Number,
  is_God: Boolean
})

let KittenModel = mongoose.model('Kitten', kittySchema);

// let litten = new KittenModel({
//   name: 'ling'
// })
// litten.save((err, data) => {

// })

KittenModel.create({
  name: 'linFei'
}).then(data => {
  console.log(data)
}).catch(err => {
  console.log(err)
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

//  http://localhost:3000/
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})