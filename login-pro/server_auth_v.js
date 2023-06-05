const express = require('express')
const { User } = require('./model.js')

const app = express()
app.use(express.json())

const log = console.log.bind(console)

const jwt = require('jsonwebtoken')

// 这个东西是全局唯一,， 正常不应该写在这里s
const SECRET = 'secretkey'



const auth = async (req, res, next) => {
    const raw = String(req.headers.authorization).split(' ').pop()
    // 解密签名
    const tokenData = jwt.verify(raw, SECRET)
    log(tokenData)
    const {id} = tokenData
    req.user = await User.findById(id)
    
    next()
}

app.get('/api/profile', auth, async (req, res) => {

    res.send(req.user)
})


app.get('/api/', async (req, res) => {
    res.send('ok')
})

app.get('/api/users', async (req, res) => {
    const users = await User.find()
    res.send(users)
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    })
    if (!user) {
        return res.status(422).send({
            message: 'user not found'
        })
    }
    const isPasswordValid = require('bcrypt').compareSync(
        req.body.password,
        user.password
        )
    if (!isPasswordValid) {
        return res.status(422).send({
            message: '密码不对'
        })
    }
    // 加密签名
    const token = jwt.sign({
        id: String(user._id)
    }, SECRET)
    res.send({
        user,
        token: token
    })
})

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    })
    res.send(user)
})



app.listen(3001, () => {
    log('http://localhost:3001')
}) 