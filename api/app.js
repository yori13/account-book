var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const session = require('express-session');

// cookieの設定
app.use(cookieParser());

// corsの設定
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST'],
  credentials: true
}));

// 登録時に使用するセッション
app.use(session({
  secret: 'my-super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // ローカル開発ならfalse、本番(HTTPS)ならtrue
    maxAge: 1000 * 60 * 15, // 15分
    ttpOnly: true, // 追加推奨
    sameSite: 'lax' // Reactとのクッキー共有に必要（または 'none' にして secure:true）
  }
}));

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

// 電子署名の照合 ////
const verifyAttestationRouter = require('./routes/webauthn/verifyAttestation');
app.use('/api/webauthn/verifyAttestation', verifyAttestationRouter);
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

// Excel出力
const getExcelOutput = require('./routes/getExcelOutput');
app.use('/api/get-excel-output', getExcelOutput);
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
