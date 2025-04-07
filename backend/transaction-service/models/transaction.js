const { DataTypes } = require('sequelize')
const sequelize = require('../config')
const Transaction = sequelize.define('Transaction', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fromAccountId: { type: DataTypes.INTEGER, allowNull: false },
    toAccountId: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'pending' }
}, { tableName: 'transactions', timestamps: true })
module.exports = Transaction
