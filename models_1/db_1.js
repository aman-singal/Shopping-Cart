const sequelize = require('sequelize');
const db_1 = new sequelize({
    dialect: 'sqlite',
    storage: __dirname + 'data.db'
})

const data =  db_1.define('data' , {
    
})