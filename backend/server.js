require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workout');

//express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next();
})

//routes
app.use('/api/workouts', workoutRoutes);

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT);
        });
    }
    )
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

