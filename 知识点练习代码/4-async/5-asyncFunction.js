const fs = require("fs")
const promisify = require("util").promisify
const readFile = promisify(fs.readFile)

async function run() {
  let x = await readFile("./x.txt", "utf-8")
  let y = await readFile("./y.txt", "utf-8")
  let z = await readFile("./z.txt", "utf-8")
  return [x, y, z]
}

run().then(result => console.log(result))

const fn = async () => {}
