const koa = require('koa');

const app = new koa()

// ctx context
app.use(async (ctx) => {
    ctx.body = "hello world"

})


app.listen(3000)