# material




# Codeing...


## 2021年5月17日 19:33:39

解决了ajax flash跳转页面的问题,现在尝试使用 express-message插件

## 2021年5月20日 22:13:26 页面大体完成. 

md 曹丹的mongoose 狗血的 一个查询数据非要搞出来是个什么乱七八糟的格式。_id都是个object
搜索都J的费时。草。也没在官网找到 相关的办法。找了一个ObjectId() 官网给的办法都不行。谁搞这玩意儿谁SB
. 准备换数据库了。


# learning log

$ mongo
$ show dbs;
$ use nodejs-blog
$ db.createCollection('articles')
$ show collections;
$ db.articles.insert({ title: "Article One", author: "rails365", body: "This is article one" });
$ db.articles.find();
$ db.articles.insert({ title: "Article Two", author: "rails365", body: "This is article two" });
$ db.articles.find().pretty();

# Q_A

## 前端使用ajax请求后success 回调函数碰到express后端flash在locals里面挂载变量信息的时候的问题?

  done > 放弃使用flash .暂且钱不用locals来拿东西。这块http 传递信息这块缺知识.

# log

找到一些vue node的前后端分离项目教程.我先跟着看一遍整个流程.

Vue+Node前后端商城项目  https://www.bilibili.com/video/BV1vJ411s7dR?p=148

?? 如果是前后端分离. vue 如何做响应式处理.

?? 实在感觉空缺了一块知识,自己感觉是webpack方面的, 尝试先过一遍针对webpack为关键词的傻逼教程视频 查一查

（持续更新中）快速掌握Webpack核心概念【Webpack】  https://www.bilibili.com/video/BV12a4y1W76V?from=search&seid=14059220905690217598

找到一个up , 全栈技术专家, 他有一个系列课程  七天个人博客全栈开发（第四集）

先跟着看看,目前感觉就是拼接知识点而已..

对着原来的求知网站看的.

## 牢骚

学过vue ,学过node.js

发现这些教程都是单独的. 没找到讲前后端分离到底如何具体到代码层面的教程的.一搜前后端分离.网上一堆鸟文章.学久了会发现,技术本省运用不难.难就难在信息壁垒.
本身前端的东西就很杂.写代码时候完全就是拼凑.J讨厌这种动作.这哪里叫编程.还有网上一堆培训机构的教程视频.全部都是格式化教程.一点意义都没有,那样写的代码无异于就是板砖.里面的任何一个方面的知识点展开深入都是很多东西.

感觉现在学习完全就是,认识层面,知道那个东西就会写,不知道就写不出来.最开始html jq 加个模板都能写前端,穿插到后端里面.学node的教程都是这样里面的前端页面是插入到服务器里面的.

真服了.到现在都没遇到什么好的教程.严格来讲真的一步步学过来的.就不可能独立完成一个项目.培训机构那种水平.感觉花钱买的就是一套知道. 知道那些东西就写出来.不知道就挤破头都不知道.一点意义都没有.从顶到下,整个社会的气氛给人这种浮躁.就算想静心来研究.光是从网上过滤一堆垃圾信息都能累死.

牢骚的话,不多讲了.还是那样.不写不行啊.迟早要写.在不突破这一层.就没办法继续下去.不能进步了.

写完vue 写完node怎么上线都不知道. 这次争取完整一点记录整个过程.也方便自己写论文.

如果有可能会有前后端分离的形式来写.实在没找到好的学习资料,就用那种html模板的形式写.



















