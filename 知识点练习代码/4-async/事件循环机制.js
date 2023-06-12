async function getInfo(a) {
    console.log(`getInfo start`)
    await setTimeout(()=> {
        console.log('得到信息', a)
    }, 2000)
    console.log('D')
}

console.log('A')
getInfo('B')
console.log('C')
