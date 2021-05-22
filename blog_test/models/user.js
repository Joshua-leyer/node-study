const mongoose = require('mongoose')

var Schema = mongoose.Schema



const UserSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        set(val) {
            return require('bcrypt').hashSync(val, 4)
        },
        required: true
    }
})


// UserSchema.set('toObject', { virtuals: true })

const User = mongoose.model('User', UserSchema)

// User.db.dropCollection('users')
module.exports = { User }
