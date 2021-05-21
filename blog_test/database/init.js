const Sequelize = require('sequelize');


const db = new Sequelize('blog', 'root', '123456789',{
  host: "localhost",
  port: '3306',
  dialect: 'mysql'
})


//官网最新的实例代码不能用。 woca 

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });




module.exports = {Sequelize, db}


