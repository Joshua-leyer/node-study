const fs = require('fs')
const path = require('path')

fs.readdir(__dirname, (err, files) => {
    if (err) {
        console.error(err)
        return
    }
    files.forEach(file => {
        if(file.endsWith('.txt')) {
            let newFile = file.replace(/.txt$/, '.html')
            let filenema = path.resolve(__dirname, file)
            let newfilename = path.resolve(__dirname, newFile)
            fs.rename(filenema, newfilename, err => {
                if (err) {
                    console.err(`重命名${file}失败`, err)
                } else {
                    console.log(`${file}命名成功`)
                }
            })
        }
    })
})