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
const PORT = process.env.PORT || 3001;

// JSONボディをパースするミドルウェア
app.use(express.json());  // express.json()を使用

// ログイン ////
const authLoginRouter = require('./routes/authLogin');
app.use('/api/authLogin', authLoginRouter);
//////////////////

// 新規ユーザー登録 ////
const makeUsersRouter = require('./routes/webauthn/makeUsers');
app.use('/api/makeUsers', makeUsersRouter);
//////////////////

// webauthnチャレンジレスポンス ////
const challengeRouter = require('./routes/webauthn/generateChallenge');
app.use('/api/webauthn/challenge', challengeRouter);
//////////////////

// 現金出納帳登録 ////
const cashAccountRouter = require('./routes/cashAccount');
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

// 現金出納帳データ取得
const getCashAccount = require('./routes/getCashAccount');
app.use('/api/get-cash-account', getCashAccount);
///////////////////

// 現金出納帳摘要項目データ取得
const getCashItem = require('./routes/getCashItem');
app.use('/api/get-cash-item', getCashItem);
///////////////////

// 現金出納帳金額項目データ取得
const getCashPriceType = require('./routes/getCashPriceCode');
app.use('/api/get-cash-price-code', getCashPriceType);
///////////////////

// クレジット出納帳データ取得
const getCreditAccount = require('./routes/getCreditAccount');
app.use('/api/get-credit-account', getCreditAccount);
///////////////////

// クレジット出納帳データ取得
const getCreditDetail = require('./routes/getCreditDetail');
app.use('/api/get-credit-detail', getCreditDetail);
///////////////////

// 現金出納帳データ更新
const getCashUpdate = require('./routes/cashUpdate');
app.use('/api/get-cash-update', getCashUpdate);
///////////////////

// クレジット出納帳データ更新
const getCreditUpdate = require('./routes/creditUpdate');
app.use('/api/get-credit-update', getCreditUpdate);
///////////////////

// dbへアクセス
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
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
