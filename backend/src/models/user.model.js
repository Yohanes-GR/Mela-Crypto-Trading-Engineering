const { DataTypes } = require('sequelize');
const {sequelize} = require('../configs/db.config');

const User = sequelize.define('user', {
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    // Other model options go here
});

module.exports = User;