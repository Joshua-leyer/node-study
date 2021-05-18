const { Article } = require('../models/articles')
const { User } = require('../models/user')


// get /admin/gegister
const registerPage = (req, res) => {
    res.render('./admin/register.html')
}

// POST   /admin/register  !! 未开通
const register = async (req, res) => {
    const { username, password } = req.body
    // console.log('注册的用户信息', req.body)
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    })

    // console.log('register user is >>>', user)
    res.send(user)
}

// post /admin/login
const login = async (req, res) => {

    const user = await User.findOne({
        username: req.body.username
    })
    if (!user) {
        return res.status(424).send({
            message: 'user not found!'
        })
    }
    const isPassword = require('bcrypt').compareSync(req.body.password, user.password)
    if (!isPassword) {
        return res.status(424).send({
            message: 'password is error'
        })
    }
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({
        id: String(user._id)
    }, 'joshua')  //校验用的
    // console.log(token)
    // req.session.token = token
    // req.session.name = 'joshua login'
    res.cookie('token1', 'joshua', {path: '/admin'})
    console.log(user)
    res.render('./admin/profile.html', {
        user
    })
}

// get /admin/login
const loginPage = (req, res) => {
    res.render('./admin/login.html', {login: true})
}


// get /admin/articles
const articlesManage = async (req, res) => {
    let token = req.headers.cookie
    
    console.log(token)
    await Article.find({}, function(err, data) {
        if (err) throw err;
        // req.flash('error', '错误')
        // res.locals.current = 'home'
        req.flash('error', 'error flash')
        res.render('./admin/articlesList.html',{data})
    })
}

// get /admin/article/add   page
const addArticle = (req, res) => {
    res.render('./admin/createArticle.html')
}

// post /admin/artilce/create
const createArticle = (req, res) => {
    console.log(req.body);
    let article = new Article({
        title: req.body.title,
        body: req.body.body
    })
    article.save(function(err) {
        if (err) {
            // console.log(err);
            // next(err)
            throw err
        }
        console.log('save article is', article)
        // req.flash("infotype", "success")
        // 我草这里要 return 
        // console.log(req)
        req.flash("info", "文章创建成功")
        return res.status(200).send({url: '/admin/articles'})
        // return res.redirect('/admin/articles')
        console.log('redirect done')
        // req.flash("info")
    })
}


// delete /admin/article/delete/:id
const deleteArticle = (req, res) => {
    console.log('datele function')
    let query = {_id: req.params.id}
    console.log('delete', query)
    Article.remove(query, function(err) {
        if (err) {
            console.log(err)
        }
        res.send('delete Article')
    })
}

// get */admin/article/edit/:id
const editArticle = (req, res) => {
    Article.findById({_id: req.params.id}, function(err, data) {
        if (err) throw err;
        console.log('edit find article ', data)
        res.render('./admin/editArticle.html', {data})
    })
    // res.send('artilce edit page')
}

// post 更新文章
const updateArticle = (req, res) => {
    let id = req.params.id
    let query = { _id: req.params.id}
    // let data = {}

    // 这里更新关于mongodb设计存储的问题
    Article.update(query, req.body, function(err) {
        if (err) {
            console.log(err)
            res.send('update article err')
        } else {
            res.send('update ok')
        }
    })
    // res.send('article update ')
}


module.exports = {
    register,
    registerPage,
    login,
    addArticle,
    createArticle,
    loginPage,
    articlesManage,
    deleteArticle,
    editArticle,
    updateArticle
}