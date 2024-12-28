const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import the Sequelize instance
const Blog = require('./blog');          // Import the Blog model
const User = require('./user');          // Import the User model
const Reply = require('./reply'); // Import the Reply model

// Define the Comment model
const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Matches the AUTOINCREMENT constraint in SQLite
  },
  blog_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Matches NOT NULL
    references: {
      model: Blog,  // References the Blog model
      key: 'id',    // Foreign key column in the Blog table
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Matches NOT NULL
    references: {
      model: User,  // References the User model
      key: 'id',    // Foreign key column in the User table
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false, // Matches NOT NULL
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Matches DEFAULT CURRENT_TIMESTAMP
    allowNull: false,
  },
}, {
  tableName: 'comments',  // Explicitly define the table name
  timestamps: false,      // Disable Sequelize's default timestamps (createdAt, updatedAt)
});
// Comment.belongsTo(Blog, { foreignKey: 'blog_id', as: 'blog' });
// Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Comment.hasMany(Reply, { foreignKey: 'comment_id', as: 'replies' });

module.exports = Comment;
