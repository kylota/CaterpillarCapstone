const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class MergeSplit extends Model { }

MergeSplit.init({
    eventType: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    eventDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    partCompany1: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    partCompany2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    wholeCompany: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    company1Children: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    company2Children: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    eventID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
        allowNull: false,
        field: 'eventID'
    }
}, {
    sequelize,
    modelName: 'MergeSplit',
    tableName: 'mergeSplit',
    timestamps: false,
});

module.exports = MergeSplit;