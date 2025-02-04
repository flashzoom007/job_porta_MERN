// const mysql = require('../utils/db');
// const { Sequelize, DataTypes, ENUM } = require('sequelize');

// const User = Sequelize.define('User',
//     {
//         FullName: {
//             type: DataTypes.STRING,
//             allowNull: false, // Required
//             validate: {
//                 notEmpty: true,
//             }
//         }, Email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 notEmpty: true,
//             }
//         }, Password: {
//             type: DataTypes.Password,
//             allowNull: false,
//             validate: {
//                 notEmpty: true,
//             }
//         }, Number: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             validate: {
//                 notEmpty: true,
//             }
//         }, Role: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             ENUM: ['Student', 'Recuriter'],
//             validate: {
//                 notEmpty: true,
//             }
//         }, Profille: {
//             Bio: { type: String },
//             SKills: { type: String },
//             Resume: { type: String },
//             ResumeOrignalName: { type: String }
//         }
//     },
// )

// module.exports = User;