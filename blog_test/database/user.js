// const Sequelize = require('sequelize');

const {Sequelize, db} = require('./init')


const User = db.define('user', {
    username:{
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: Sequelize.STRING,
        validate: {
            notEmpty: true
        }
    }
})



// User.sync().then(()=>{
//     console.log('User表同步')
// })


module.exports = User

