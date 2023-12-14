const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('capstone', 'capstone', 'capstone123', {
    host: 'tj.thomii.com',
    dialect: 'mysql' // choose the dialect
});

// const sequelize = new Sequelize('Registration', 'root', 'localdbpwd', {
//     host: '127.0.0.1',
//     port: 3306,
//     dialect: 'mysql'
// });

module.exports = sequelize;

