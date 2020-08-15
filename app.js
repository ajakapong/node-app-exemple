const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const staffRouter = require('./routes/staff');
const mongoose = require('mongoose');

//middleware
const errorHanlder  = require("./middlewares/errorHaneler")
const passport = require('passport');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/pgbackend',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

app.use(passport.initialize())

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/staff', staffRouter);

app.use(errorHanlder);

module.exports = app;
