//imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/router');

//express setup
const app = express();

//middleware
app.use(express.json());
app.use(express.static('build'))

//routes
app.use('/api/user', route);

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log('Server is running on port '+ process.env.PORT);
        })
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit the process if MongoDB connection fails
      });

