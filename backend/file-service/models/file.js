const { DataTypes } = require('sequelize')
const sequelize = require('../config')
const File = sequelize.define('File', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ownerId: { type: DataTypes.INTEGER, allowNull: false },
    blobUrl: { type: DataTypes.STRING, allowNull: false },
    filename: { type: DataTypes.STRING, allowNull: false }
}, { tableName: 'files', timestamps: true })
module.exports = File
