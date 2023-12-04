const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Employee extends Model { }

Employee.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING(255)
    },
    lastName: {
        type: DataTypes.STRING(255)
    },
    employer: {
        type: DataTypes.STRING(255)
    },
    ssn: {
        type: DataTypes.BIGINT
    }
}, {
    sequelize,
    modelName: 'Employee',
    tableName: 'employee'
});

module.exports = Employee;
