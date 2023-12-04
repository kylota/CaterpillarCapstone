const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

const Employer = require('./Employer');
const Employee = require('./Employee');

class EmployedInJob extends Model { }

EmployedInJob.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        references: {
            model: Employee,
            key: 'id'
        }
    },
    theEmployee: {
        type: DataTypes.VARCHAR(255),
        references: {
            model: Employee,
            key: 'id',
            default: null,
            //deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE // Optional: Specify the deferrable mode
        }
    },
    withCompany: {
        type: DataTypes.STRING(255),
        references: {
            model: Employee,
            key: 'employer'
        }
    },
    jobTitle: {
        type: DataTypes.STRING(255) // TINYTEXT equivalent
    },
    startDate: {
        type: DataTypes.DATE
    },
    endDate: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'EmployedInJob',
    tableName: 'employedInJob'
});

EmployedInJob.belongsTo(Employee, {
    foreignKey: 'id',
    as: 'id'
});

EmployedInJob.belongsTo(Employee, {
    foreignKey: 'employer',
    as: 'withCompany'
});

module.exports = EmployedInJob;
