const express = require('express');
const ExcelJS = require('exceljs');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const { cashAccount, creditAccount, creditDetail } = require('../models');
const workbook = new ExcelJS.Workbook();
const startMonth = "01";
const startDay = "01";
const endMonth = "12";
const endDay = "31";

router.post('/', async (req, res) => {
  try {
    console.log("クレジット明細作成処理開始");
    const getDataYear = req.body.year;
    const Title = "現金出納帳";
    await makeCreditSheet(getDataYear);
    const filePath = path.join(__dirname, '../tmp', 'output.xlsx');
    await workbook.xlsx.writeFile(filePath);
    res.download(filePath, Title, (err) => {
      if (err) {
        console.error('ファイル送信エラー:', err);
        return res.status(500).send('ファイル送信中にエラーが発生しました。');
      }
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('ファイル削除エラー:', unlinkErr);
          return res.status(500).send('ファイル削除中にエラーが発生しました。');
        }
        console.log('ファイル削除完了');
      });
    });
    console.log("クレジット明細作成処理終了");
  } catch (error) {
    console.error("エラー発生:", error);
    res.status(500).send('クレジット明細作成中にエラーが発生しました。');
  }
});

async function makeCreditSheet(year) {
  const sheetName = 'クレジットカード明細';
  const existingSheet = workbook.getWorksheet(sheetName);
  if (existingSheet) {
    workbook.removeWorksheet(existingSheet.id);
  }

  const creditWorkSheet = workbook.addWorksheet(sheetName);
  creditWorkSheet.getCell('A1').value = year + '年度';

  // 列ヘッダ設定
  creditWorkSheet.columns = [
    { header: '月' },
    { header: '日' },
    { header: 'ガソリン代' },
    { header: '携帯電話代' },
    { header: '作業着代' },
    { header: '材料費' },
    { header: 'ETC' },
    { header: 'その他' },
    { header: '合計（月）' },
    { header: '備考（その他内訳等）' }
  ];

  // サンプルデータ
  const sampleData = [
    { month: 1, day: 5, gasoline: 1200, phone: 3000, uniform: 4000, material: 500, etc: 300, other: 0, total: 8000, remarks: 'N/A' },
    { month: 2, day: 10, gasoline: 1100, phone: 2800, uniform: 4500, material: 600, etc: 350, other: 100, total: 8500, remarks: '追加分' },
    { month: 3, day: 15, gasoline: 1500, phone: 3500, uniform: 5000, material: 700, etc: 400, other: 200, total: 9500, remarks: '備品購入' },
    { month: 4, day: 20, gasoline: 1300, phone: 3200, uniform: 4800, material: 550, etc: 250, other: 150, total: 8600, remarks: '消耗品' }
  ];

  // サンプルデータをシートに追加
  sampleData.forEach(data => {
    creditWorkSheet.addRow([
      data.month,
      data.day,
      data.gasoline,
      data.phone,
      data.uniform,
      data.material,
      data.etc,
      data.other,
      data.total,
      data.remarks
    ]);
  });
}

function makeCashSheet() {
  // ここでは現金出納帳シートを作成する処理を実装できます
}

async function getCreditData(year) {
  const start = year + "-" + startMonth + "-" + startDay;
  const end = year + "-" + endMonth + "-" + endDay;
  return await creditAccount.findAll({
    where: {
      date: {
        [Op.between]: [start, end]
      }
    }
  });
}

async function getCreditDetailData(start, end) {
  return await creditDetail.findAll({
    where: {
      date: {
        [Op.between]: [start, end]
      }
    }
  });
}

module.exports = router;
