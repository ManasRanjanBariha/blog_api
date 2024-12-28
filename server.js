const bodyParser = require('body-parser')
const express=require('express')
const sequelize = require('./database.js');
const Comment = require('./models/comment');
const User = require('./models/user');
const Reply = require('./models/reply');

const app=express()

app.use(bodyParser.json());
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('hello World!!');
})
sequelize.sync({ force: false }) // Use `force: true` only for development/testing to recreate tables
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Error syncing database:', err));

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);  
})
