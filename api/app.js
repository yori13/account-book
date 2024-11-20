var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors());
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;

// 現金出納帳登録 ////
const cashAccountRouter = require('./routes/cashAccount');
app.use(bodyParser.json()); // JSONのリクエストボディをパースするためのミドルウェア
app.use('/api/cash-account', cashAccountRouter);
//////////////////

// クレジットその他詳細登録
const creditDetailRouter = require('./routes/creditDetail');
app.use('/api/credit-detail', creditDetailRouter);
///////////////////

// クレジット出納帳登録
const creditAccountRouter = require('./routes/creditAccount'); // 修正: パスの修正
app.use('/api/credit-account', creditAccountRouter);
///////////////////

// dbへアクセス
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
