const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { Article } = require('../models/articles')
const { User } = require('../models/user')

const log = console.log

const auth = function (req, res, next) {
    //判断当前是否登录了
    let user_id = req.cookies.user_id;

    console.log('是否登录了>>>', req.cookies)

    if (user_id) {
        console.log('登录了 >>>', user_id)
        next()
    } else {
        // 注意这里坑... 不能不写 else 否则这里相当于返回了浏览器一次相应,而这是个中间件
        // 这可能会导致后面的 处理函数又返回一次响应。报错
        res.redirect('/admin/login') // !
    }
}

//post /admin/register
router.post("/register", async (req, res) => {
    const { username, password } = req.body
    // console.log('注册的用户信息', req.body)
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    })

    // console.log('register user is >>>', user)
    res.send(user)
})


// /admin
router.get('/', (req, res) => {
    res.redirect('/admin/login')
})


// get /admin/login
router.get('/login', (req, res) => {
    console.log('enter /admin/login >>>')
    res.render('./admin/login.html')
})


// post /admin/login
router.post('/login', async (req, res) => {

    const user = await User.findOne({
        username: req.body.username
    })
    if (!user) {
        return res.status(424).redirect('/admin/login')
        // return res.status(424).send({
        //     message: 'user not found!'
        // })
    }
    const isPassword = require('bcrypt').compareSync(req.body.password, user.password)
    if (!isPassword) {
        return res.status(424).redirect('/admin/login')
        // return res.status(424).send({
        //     message: 'password is error'
        // })
    }
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({
        id: String(user._id)
    }, 'joshua')  //校验用的
    // console.log(token)

    res.cookie('user_id', user._id, {path: '/admin'})
    console.log('get ', user._id)
    res.redirect('/admin/dashboard')
})

// /admin/dashboard
router.get('/dashboard', auth, async (req, res) => {

    let page = req.query.page || 1;

    let pagesize = 6;
    let ArticlesCount = await Article.countDocuments({});
    //总页数
    let total = Math.ceil(ArticlesCount / pagesize);

    // limit () 限制查询的数量
    // skip()  跳过多少条数据,设定开始查询的位置
    // 根据 page　=> 数据开始位置
    let start = (page - 1) * pagesize;
    await Article.find({}).sort({_id: -1}).limit(pagesize).skip(start).then((doc) => {
        log('/dashboard get doc is >>>', doc)
        res.render('./admin/dashboard.html', {
            doc: doc,
            page: page,
            total: total
        })
    }).catch( function(error) {
        throw error
    })
})


/**
 * @新增提交接口
 */

router.get('/add', auth, (req, res) => {
    res.render('./admin/addArticle.html')
})


router.post('/create', auth, async (req, res) => {
    // let article = new Article({
    //     tittle: req.body.tittle,
    //     body_html: req.body.body_html,
    //     body_mk: req.body.body_mk
    // })
    // log('/admin/create get data is >>>>>>>>>', article)
    // await article.save(function(err) {
    //     if (err) throw err;
    //     log('save article is>>>>', article)
    //     return res.status(200).send({url: '/admin/dashboard'})
    // })

    await Article.create({
        tittle: req.body.tittle,
        body_html: req.body.body_html,
        body_mk: req.body.body_mk
    }, function(error, doc){
        if (error) throw error;
        log('save article is>', doc)
        return res.status(200).send({url: '/admin/dashboard'})
    })
})





/**
 * @修改编辑接口
 */
// get /admin/article/edit/:id
router.get('/edit/:id', auth, async (req, res) => {
    log('/edit path function >>>>>') 
    let id = mongoose.Types.ObjectId(req.params.id);
    await Article.findById({_id: id}, function(err, doc) {
        if (err) throw err;
        log('mongoose get doc ', doc)
        res.render('./admin/edit.html', {doc})
    })
})

// post 修改文章 updateArticle
router.post('/update/:id', auth, async (req, res) => {
    log('/update function >>>>>>>')
    let query = {_id: req.params.id}
    // 这里更新关于mongodb设计存储的问题
    log('/update get data is >>>>>', req.body)
    Article.updateOne(query, req.body, function(err) {
        if (err) {
            console.log(err)
            res.send('update article err')
        } else {
            res.send('update ok')
        }
    })
})


router.get("/delete/:id", auth, async (req, res) => {
    log('datele function')
    let id = mongoose.Types.ObjectId(req.params.id);
    let query = {_id: id}
    await Article.deleteOne(query, function(err) {
        if (err) {
            console.log(err)
        }
        log('/delete/ path success >>>>')
        res.redirect('/admin/dashboard')
    })
})


module.exports = router;
