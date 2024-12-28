const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import the Sequelize instance
const User = require('./user');          // Import the User model for the foreign key relationship
const Comment = require('./comment'); // Import the Comment model

// Define the Blog model
const Blog = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Matches the AUTOINCREMENT constraint in SQLite
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false, // Matches NOT NULL
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false, // Matches NOT NULL
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false, // Matches NOT NULL
    references: {
      model: User,  // References the User model
      key: 'id',    // Foreign key column in the User table
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Matches DEFAULT CURRENT_TIMESTAMP
    allowNull: false,
  },
}, {
  tableName: 'blogs',  // Explicitly define the table name
  timestamps: false,   // Disable Sequelize's default timestamps (createdAt, updatedAt)
});
// Blog.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
// Blog.hasMany(Comment, { foreignKey: 'blog_id', as: 'comments' });


module.exports = Blog;
