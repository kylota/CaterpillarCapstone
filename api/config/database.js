const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('capstone', 'capstone', 'capstone123', {
    host: 'tj.thomii.com',
    // host: 'localhost',
    // port: 3306,
    dialect: 'mysql' // choose the dialect
});

module.exports = sequelize;

