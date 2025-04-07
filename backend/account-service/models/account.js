const { DataTypes } = require('sequelize')
const sequelize = require('../config')
const Account = sequelize.define('Account', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    accountNumber: { type: DataTypes.STRING, unique: true, allowNull: false },
    balance: { type: DataTypes.DECIMAL(10,2), defaultValue: 0 },
    status: { type: DataTypes.STRING, defaultValue: 'active' }
}, { tableName: 'accounts', timestamps: true })
module.exports = Account
