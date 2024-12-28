const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import the Sequelize instance
const Blog = require('./blog');          // Import the Blog model
const User = require('./user'); 
const Comment = require('./comment'); // Import the Comment model
const Reply = sequelize.define('Reply', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Comment,  // References the Comment model
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,     // References the User model
        key: 'id',
      },
    },
    reply: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  }, {
    tableName: 'replies',
    timestamps: false,
  });
  
  // Add the missing association here
//   Reply.belongsTo(Comment, { foreignKey: 'comment_id', as: 'comment' });
//   Reply.belongsTo(User, { foreignKey: 'user_id', as: 'user' });  // This line is necessary
  
  module.exports = Reply;
  