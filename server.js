const express = require('express');
const sequelize = require('./database.js'); // Sequelize instance
const authRoutes = require('./routes/auth.js'); // Import auth routes
const blogRoutes = require('./routes/blog.js'); // Import auth routes

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Sync database models (ensure models match your schema)
sequelize.sync({ force: false })
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Error syncing database:', err));

// Use authentication routes for handling API requests
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
