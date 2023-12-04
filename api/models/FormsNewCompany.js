const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

const Employer = require('./Employer');

class FormsNewCompany extends Model { }

FormsNewCompany.init({
    parentEmployer: {
        type: DataTypes.INTEGER,
        references: {
            model: Employer,
            key: 'id'
        }
    },
    childEmployer: {
        type: DataTypes.INTEGER,
        references: {
            model: Employer,
            key: 'id'
        }
    },
    onDate: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'FormsNewCompany',
    tableName: 'formsNewCompany'
});

FormsNewCompany.belongsTo(Employer, {
    foreignKey: 'parentEmployer',
    as: 'ParentEmployer'
});

FormsNewCompany.belongsTo(Employer, {
    foreignKey: 'childEmployer',
    as: 'ChildEmployer'
});

module.exports = FormsNewCompany;
