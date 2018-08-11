var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan'),
    mongoose = require('mongoose'),
    mongooseConf = require('./config/mongoose');

var indexRouter = require('./routes/index');
var phoneModelRouter = require('./routes/models');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Mongoose */
var uri = '';
if (mongooseConf.username) {
    uri = `mongodb://database:${mongooseConf.port}/${mongooseConf.username}:${mongooseConf.password}@${mongooseConf.host}:${mongooseConf.port}/${mongooseConf.database}`;
} else {
    uri = `mongodb://database:${mongooseConf.port}/${mongooseConf.database}`;
}
mongoose.connect(uri, mongooseConf.options);


app.use('/', indexRouter);

module.exports = app;