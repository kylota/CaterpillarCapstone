const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('capstone', 'capstone', 'capstone123', {
    host: 'tj.thomii.com',
    dialect: 'mysql' // choose the dialect
});

/*const sequelize = new Sequelize('sys', 'root', 'root', {
   host: 'localhost',
   dialect: 'mysql'
});*/

module.exports = sequelize;

