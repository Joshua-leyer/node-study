// console.log("start")

// setTimeout(() => {
//   console.log("setTimeout 1")
// }, 0)

// setTimeout(() => {
//   console.log("setTimeout 2")
// }, 0)

// console.log("end")
// start end 1 2

// setTimeout(() => console.log("1"), 0)
// setImmediate(() => console.log("2"))

// function sleep(delay) {
//   var start = new Date().getTime()
//   while (new Date().getTime() - start < delay) {
//     continue
//   }
// }
// sleep(1000)
// 1 2

// setTimeout(() => console.log("1"), 0)
// setImmediate(() => console.log("2"))
//  2 1 或 1 2

// const fs = require("fs")

// fs.readFile("./index.html", () => {
//   setTimeout(() => console.log("1"), 0)
//   setImmediate(() => console.log("2"))
// })
// 2 1

// setTimeout(() => console.log("1"), 50)
// process.nextTick(() => console.log("2"))
// setImmediate(() => console.log("3"))
// process.nextTick(() => console.log("4"))
// 2 4 3 1

// setTimeout(() => console.log(1))
// setImmediate(() => console.log(2))
// process.nextTick(() => console.log(3))
// Promise.resolve().then(() => console.log(4))
// ;(() => console.log(5))()
// 5 3 4 1 2
// process.nextTick(() => console.log(1))
// Promise.resolve().then(() => console.log(2))
// process.nextTick(() => console.log(3))
// Promise.resolve().then(() => console.log(4))
// 1 3 2 4

// setTimeout(() => console.log("1"), 50)
// process.nextTick(() => console.log("2"))
// setImmediate(() => console.log("3"))
// process.nextTick(() =>
//   setTimeout(() => {
//     console.log("4")
//   }, 1000)
// )
// 2 3 1 4

// function sleep(delay) {
//   var start = new Date().getTime()
//   while (new Date().getTime() - start < delay) {
//     continue
//   }
//   console.log("ok")
// }

// console.log("start")
// setImmediate(sleep, 2000)
// console.log("end")
