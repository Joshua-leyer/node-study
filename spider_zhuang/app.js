const fs = require('fs')
const path = require('path')

const request = require('sync-request')
const cheerio = require('cheerio')

const {log, e, es, find } = require('./base.js');



const saveData = (data) => {
    fs.writeFile(path.resolve(__dirname, 'output.txt'), data, function(err) {
        if (err) throw err;
    })
}

const __main = () => {
    const url = `https://so.gushiwen.cn/guwen/bookv_46653FD803893E4F1DBBC3E443B818EE.aspx`
    let res = request('GET', url)
    // log( res.getBody('utf8') )
    let body = res.getBody('utf8')
    let $ = cheerio.load(body)
    let dataArr = $(".contson").children('p')
    log(dataArr)
    let result = [];
    dataArr.each(function(i, elem) {
         result[i] = $(this).text();
        // log($(this))
    })
    result = result.join('\n');
    log(result)
    saveData(result)
}

__main()