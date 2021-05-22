const bcrypt = require('bcrypt');

const User = require('../database/user');
const Article = require('../database/articles');


// get /admin/gegister
const registerPage = (req, res) => {
    res.render('./admin/register.html')
}

// POST   /admin/register  !! 未开通
const register = async (req, res) => {
    const { username, password } = req.body
    // console.log('注册的用户信息', req.body)
    // res.status(200).send(username, password)
    console.log(username)
    const userModel = await User.findOne({where: {username}});
    if (userModel){
        return res.send('用户已经存在')
    } 
    const user = await User.create({username, password: bcrypt.hashSync(password, 5)})

    console.log('register user is >>>', user)
    res.send({msg: 'register success!!'})
}



const Profile = async (req, res) => {
    res.render("./admin/edit_profile.html")
}


// post /admin/login
const login = async (req, res) => {
    const {username, password} = req.body
    const userModel = await User.findOne({where: {username}})
    if (!userModel) {
        return res.status(424).send({
            message: 'user not found!'
        })
    }
    const isPassword = bcrypt.compareSync(req.body.password, userModel.dataValues.password)
    if (!isPassword) {
        return res.status(424).send({
            message: 'password is error'
        })
    }
    let id = userModel.dataValues.id
    console.log('登录成功 user id is>>>', id)
    // res.send({msg: '登录成功'})
    res.cookie('user_id', id, {path: '/admin'})
    res.redirect('/admin')
}


const authTest = function (req, res, next) {
    const token = String(req.headers.authorization).splite(' ').pop()
    console.log(token)
}

// get /admin/login
const loginPage = (req, res) => {
    console.log('login html')
    res.render('./admin/login.html', {login: true})
}


// get /admin
const dashboard = async (req, res) => {
    // let user_id = req.cookies.user_id

    let data = await Article.findAll();
    /* !!解决难道数据拿到后不是标准对象格式问题. mongoose也是一球样. */
    data = JSON.stringify(data);
    data = JSON.parse(data);
    res.render('./admin/dashboard.html', {data: data})
}

// get /admin/article/add   page
const addArticle = (req, res) => {
    res.render('./admin/createArticle.html')
}

// post /admin/article/create
const createArticle = async (req, res) => {
    console.log(req.body);
    // const article = await Article.create({tittle: 'jiaopsdfi', auther: 'joshua', body: 'ajsidfopausidofnas'})
    
    console.log(article.toJSON())
    res.send('article create success')
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
    authTest,
    register,
    registerPage,
    login,
    addArticle,
    createArticle,
    loginPage,
    dashboard,
    deleteArticle,
    editArticle,
    updateArticle
}