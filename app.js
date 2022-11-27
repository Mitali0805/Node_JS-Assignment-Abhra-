const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const {logger} = require('./logger');

//app instance
const app = express();  

//import route
const userRoute = require('./User/routes/user');

//mongoDB
mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true , useUnifiedTopology: true , useCreateIndex:true})
.then(()=>{
    logger.info('DB is connected');
    console.log('DB is connected');
})

//middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

//Routes which handles request i.e middleware
app.use('/api',userRoute);

//Error Handling
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);    //fwd the error req
})

app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })   
})

module.exports = app;