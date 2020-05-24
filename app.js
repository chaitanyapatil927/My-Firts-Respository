const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
//change hua ka checking
//change 2 forking
mongoose.connect(
    'mongodb+srv://chaitanyapatil927:' + process.env.MONGO_ATLAS_PW + '@node-rest-codeblog-9hddi.mongodb.net/test?retryWrites=true&w=majority',
    {
        useMongoClient: true
    }
);
mongoose.Promise = global.Promise;


const codeRoutes = require('./api/routes/codes');
const userRoutes = require('./api/routes/user');


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","*")
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({ });
    }
    next();
});

app.use('/codes', codeRoutes);
app.use('/user', userRoutes);



app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);    
    });

app.use((error, req, res, next) =>{
    res.status(error.status || 500)
    res.json({
        error: {
            message : error.message
        }
    })    
    });   


module.exports = app;
