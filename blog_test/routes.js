var express = require('express');
var router = express.Router();


const admin = require('./routers/admin')
const home = require('./routers/home')


const auth = function (req, res, next) {
    //判断当前是否登录了
    let user_id = req.cookies.user_id;

    console.log(req.cookies)

    // let user_id = getCookie('user_id')
    // console.log(user_id)
    if (user_id) {
        console.log(user_id)
        next()
    } else {
        // 注意这里坑... 不能不写 else 否则这里相当于返回了浏览器一次相应,而这是个中间件
        // 这可能会导致后面的 处理函数又返回一次响应。报错

        res.redirect('/admin/login') // !
    }
}

// 前面 =================

router.get('/', home.index)
router.get('/post/:id', home.watchArticle)
router.get('/articles', home.articlesPage)

// 后台 ================
router.get('/admin', auth, admin.dashboard)
router.get('/admin/register', admin.registerPage)
router.get('/admin/login', admin.loginPage)
router.get('/admin/article/add', admin.addArticle)

router.post('/admin/article/create', admin.createArticle)
router.delete('/admin/article/delete/:id', admin.deleteArticle)
router.get('/admin/article/edit/:id', admin.editArticle)
// router.post('/admin/register', admin.register)
router.post('/admin/article/update/:id', admin.updateArticle)
router.post('/admin/login', admin.login)

module.exports = router;

