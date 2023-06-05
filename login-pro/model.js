const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/expresslogin-learn', {
    useNewUrlParser: true,
    // useCreateIndex: true
})

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        set(val){
            // hashSync 操作数据库,  这里我们使用同步的方法.
            return require('bcrypt').hashSync(val, 10)
        }
    }
})

const User = mongoose.model('User',UserSchema)


module.exports = {
    User
}