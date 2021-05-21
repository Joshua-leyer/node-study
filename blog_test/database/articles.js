const {Sequelize, db} = require('./init')


const Article = db.define('article', {
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
})


Article.sync().then(()=>{
    console.log('Article表同步')
})

module.exports = Article