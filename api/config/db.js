const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'sa',
  password: 'sa',
  database: 'account-book-db'
});

connection.connect((err) => {
  if (err) {
    console.error('データベース接続エラー: ' + err.stack);
    return;
  }
  console.log('データベースに接続しました: ' + connection.threadId);
});

module.exports = connection;

