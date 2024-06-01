var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var { Sequelize } = require('sequelize');
var sequelize = new Sequelize("project", "root", "!Aa5520634", {
	host: "localhost",
	dialect: "mysql"
});
global.sequelize = sequelize;
require("./model")(Sequelize, sequelize);

app.use(cors({
	origin: 'http://localhost:8080', // 클라이언트의 주소
	credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '!Aa5520634',
	database: 'project'
};

const sessionStore = new MySQLStore(options);

app.use(session({
	key: 'session_id',
	secret: 'asd123!@#',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
