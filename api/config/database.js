const { Sequelize } = require('sequelize');

//const sequelize = new Sequelize('capstone', 'capstone', 'capstone123', {
//    host: 'tj.thomii.com',
//    dialect: 'mysql' // choose the dialect
//});

 const sequelize = new Sequelize('capstone', 'capstone', 'capstone123', {
     host: 'localhost',
     port: 3306,
     dialect: 'mysql'
 });

module.exports = sequelize;

