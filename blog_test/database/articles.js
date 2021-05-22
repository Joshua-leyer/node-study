// const Sequelize = require('sequelize')
// const sequelize = require('../config/main')
const {Sequelize, db} = require('./init')

const article = db.define(
  'article',
    {
        tittle: {
            type: Sequelize.STRING,
            // defaultValue: '424',
            validate: {
                notEmpty: true
            }
        },
        auther: {
            type: Sequelize.STRING,
            defaultValue: 'joshua',
            validate: {
                notEmpty: true
            }
        },
        body: {
            type: Sequelize.STRING,
            validate:{notEmpty: true}
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'article'
    }
)



article.sync().then(()=>{
    console.log('Article表同步')
})
module.exports = article