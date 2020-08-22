const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const staffRouter = require('./routes/staff');
const blogRouter = require('./routes/blog');
const mongoose = require('mongoose');

//middleware
const errorHanlder  = require("./middlewares/errorHaneler")
const passport = require('passport');
const passportJWT = require('./middlewares/passportJWT');

const app = express();

const { MONGODB_URI } =require('./config')

app.use(logger('dev'));
app.use(express.json({ limit : '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })

app.use(passport.initialize())

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/staff', staffRouter);
app.use('/api/blog', [ passportJWT.isLogin ] ,blogRouter);
app.use(errorHanlder);

module.exports = app;
