const sequelize = require('sequelize');

const db = new sequelize({
    dialect: "sqlite",
    storage: __dirname + '/content.db',
})

const Users = db.define('user' , {
    product:{
        type: sequelize.STRING,
        allowNull: false,
    },
    price:{
        type: sequelize.INTEGER,
        allowNull: false,
    

    },
    quantity:{
        type: sequelize.INTEGER,
        defaultValue: 0,
    },
})



module.exports = {
    db,Users
}