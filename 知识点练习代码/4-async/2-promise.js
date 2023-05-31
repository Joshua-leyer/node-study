const fs = require("fs")

const promise = new Promise(function (resolve, reject) {
  fs.readFile("./x.txt", "utf-8", function (error, result) {
    if (error) {
      reject(error)
    } else {
      resolve(result)
    }
  })
})

promise
  .then(function (result) {
    console.log(result)
  })

  .catch(function (error) {
    console.log(error)
  })
  .finally(function(){
    console.log('finally')
  })
