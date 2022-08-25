const express = require('express');
const app = express();
const usersRoute = require('./api/routes/users');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect('mongodb+srv://SagarSingh:SagarSingh@userform.wq0unia.mongodb.net/?retryWrites=true&w=majority', 
    // {
    //     useMongoClient: true
    // }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors({origin:true,credentials: true}));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');     //For all client
//     // res.header('Access-Control-Allow-Origin', 'http://mu-cool-page.com');    //For my-cool-page.com client
//     res.header('Acess-Control-Allow-Headers', 
//     "Orgin, X-Requested-With, Content-Type, Accept, Authorization");
//     if(req.method === 'OPTIONS'){
//         res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// });

app.use('/users', usersRoute);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

module.exports = app;