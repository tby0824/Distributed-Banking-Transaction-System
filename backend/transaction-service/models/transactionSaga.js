const { DataTypes } = require('sequelize')
const sequelize = require('../config')
const TransactionSaga = sequelize.define('TransactionSaga', {
    sagaId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    transactionId: { type: DataTypes.INTEGER, allowNull: false },
    currentStep: { type: DataTypes.INTEGER, defaultValue: 0 },
    state: { type: DataTypes.STRING, defaultValue: 'INIT' }
}, { tableName: 'transaction_sagas', timestamps: true })
module.exports = TransactionSaga
