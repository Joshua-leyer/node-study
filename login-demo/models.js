const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/27017', {
    useNewUrlParser: true,
    useCreateIndex: true
})



const UserSchema = new mongoose.Schema({
    // username: String, 简写
    username: {type: String, unique: true},
    password: {
        type: String,
        //存储的时候设置一下  根据传进来的值进行处理 ,存储返回值
        set(val){   
            return require('bcrypt').hashSync(val, 10)
            // return val
        }
    }
})

const User = mongoose.model('User', UserSchema)


// User.db.dropCollection('users')
module.exports = { User }
