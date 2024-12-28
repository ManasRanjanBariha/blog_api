const { DataTypes, INTEGER } = require('sequelize');
const sequelize = require('../database');
const Blog = require('./blog'); // Import the Blog model
const Comment = require('./comment'); // Import the Comment model
const Reply = require('./reply'); // Import the Reply model


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false, // Matches NOT NULL
        unique: true,     // Matches UNIQUE constraint
        validate: {
            isEmail: true,   // Ensures email format is valid
        },
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false, // Matches NOT NULL
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Matches DEFAULT CURRENT_TIMESTAMP
        allowNull: false,
    },
},{
    tableName:"users",
    timestamps:false,
});

User.hasMany(Reply, { foreignKey: 'user_id', as: 'replies' });

// User.hasMany(Blog, { foreignKey: 'author_id', as: 'blogs' });
// User.hasMany(Comment, { foreignKey: 'user_id', as: 'comments' });
module.exports=User;