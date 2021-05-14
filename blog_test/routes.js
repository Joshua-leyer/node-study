var express = require('express');
var router = express.Router();


const admin = require('./routers/admin')
const home = require('./routers/home')


function auth(req, res, next) {
    //核心是判断当前是否登录了
    if (req.session.user){
        return next()
    }
    res.redirect('/users/login') // !
}

// 前面 =================

router.get('/', home.index);
router.get('/article/:id', home.watchArticle)
router.get('/articles', home.articlesPage)

// 后台 ================

router.get('/admin/login', admin.loginPage)
router.get('/admin/articles', admin.articlesManage)
router.get('/admin/article/add', admin.addArticle)
router.delete('/admin/article/:id', admin.deleteArticle)
router.get('/admin/article/edit/:id', admin.editArticle)
router.post('/admin/artilce/update/', admin.updateArticle)
router.post('/admin/login', admin.login)

module.exports = router;

