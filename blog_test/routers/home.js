
const Article = require('../database/articles.js')

// get / 
const index = async (req, res) => {
    console.log('/index 首页')
    // await Article.create({tittle:'jasdifpajsdi',body:"jaisdufija"});
    try {
        let data = await Article.findAll()
        data = JSON.stringify(data);
        data = JSON.parse(data);
        console.log(data)
        console.log('get / 路由 首页 ')
        res.render('./user/index.html', {data})
    } catch (error) {
        console.log(error)
    }
}

const log = console.log
// article page  /post/:id
async function watchArticle(req, res){
    console.log('我运行了几遍?')
    
    let { id } = req.params
    // const data = await Article.findOne({where: {"id": id}})
    // try {
    //     log(123)
    //     data = JSON.stringify(data);
    //     data = JSON.parse(data);
    //     console.log('/post get data is', data)
    //     res.render('./user/post.html', {data: data})
    // } catch (e) {
    //     console.log(e)
    // }
    // log('查询完成=================================')
}




const articlesPage = (req, res) => {
    res.send('articles list page')
}


module.exports = {
    index,
    watchArticle,
    articlesPage
}