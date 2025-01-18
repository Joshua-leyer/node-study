const fs = require("node:fs");

let result = fs.readFileSync('./dataFs.txt')

console.log(result)