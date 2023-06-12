const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async (ctx, next) => {
  console.log(`第1个中间件 start`)
  await next()
  console.log(`第1个中间件 end`)
})

app.use(async (ctx, next) => {
  console.log(`第2个中间件 start`)
  await next()
  setTimeout(()=> {
    console.log(`第二个中间件的定时器`)
  }, 2000)
  console.log(`第2个中间件 end`)
})
app.use(async (ctx, next) => {
  console.log(`第3个中间件 start`)
  await next()
  console.log(`第3个中间件 end`)
})





// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
