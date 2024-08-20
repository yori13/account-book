import React, { useState } from "react";
import axios from 'axios';

const CashbookForm = () => {
  // 初期のフォームデータセットを空の配列で初期化
  const [entries, setEntries] = useState([
    { date: '', itemCode: '', memo: '', priceTypeCode: '', price: '', tax: false }
  ]);

  // フォームの入力値を更新する関数
  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedEntries = [...entries];

    if (type === 'radio') {
      updatedEntries[index] = { ...updatedEntries[index], priceTypeCode: parseInt(value, 10) };
    } else if (type === 'checkbox') {
      updatedEntries[index] = { ...updatedEntries[index], [name]: checked };
    } else if (name === 'itemCode') {
      updatedEntries[index] = { ...updatedEntries[index], itemCode: parseInt(value, 10) };
    } else {
      updatedEntries[index] = { ...updatedEntries[index], [name]: value };
    }

    setEntries(updatedEntries);
  };

  // 新しいフォームセットを追加する関数
  const addEntry = () => {
    setEntries([...entries, { date: '', itemCode: '', memo: '', priceTypeCode: '', price: '', tax: false }]);
  };

  // フォームの送信処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/cash-account', entries);
      console.log('Data submitted successfully:', response.data);
      alert("登録しました");
    } catch (error) {
      console.log(entries);
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {entries.map((entry, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <label htmlFor={`date-${index}`}>日付</label>
            <input
              type="date"
              name="date"
              id={`date-${index}`}
              value={entry.date}
              onChange={(e) => handleChange(index, e)}
            />
            
            <label htmlFor={`select-item-${index}`}>費目</label>
            <select
              name="itemCode"
              id={`select-item-${index}`}
              value={entry.itemCode}
              onChange={(e) => handleChange(index, e)}
            >
              <option value={0}>選択してください</option>
              <option value={3}>繰越</option>
              <option value={1}>消耗品</option>
              <option value={2}>交通費</option>
            </select>

            
            <label htmlFor={`memo-${index}`}>摘要</label>
            <input
              type="text"
              name="memo"
              id={`memo-${index}`}
              value={entry.memo}
              onChange={(e) => handleChange(index, e)}
            />
            
            <input
              type="radio"
              name={`priceTypeCode-${index}`}
              value={1}
              id={`debit-${index}`}
              checked={entry.priceTypeCode === 1}
              onChange={(e) => handleChange(index, e)}
            />
            <label htmlFor={`debit-${index}`}>借方</label>
            
            <input
              type="radio"
              name={`priceTypeCode-${index}`}
              value={2}
              id={`credit-${index}`}
              checked={entry.priceTypeCode === 2}
              onChange={(e) => handleChange(index, e)}
            />
            <label htmlFor={`credit-${index}`}>貸方</label>
            
            <input
              type="radio"
              name={`priceTypeCode-${index}`}
              value={3}
              id={`brought-forward-${index}`}
              checked={entry.priceTypeCode === 3}
              onChange={(e) => handleChange(index, e)}
            />
            <label htmlFor={`brought-forward-${index}`}>繰越金額</label>
            
            <label htmlFor={`price-${index}`}>金額</label>
            <input
              type="number"
              name="price"
              id={`price-${index}`}
              value={entry.price}
              onChange={(e) => handleChange(index, e)}
            />
            
            <input
              type="checkbox"
              name="tax"
              id={`tax-${index}`}
              checked={entry.tax}
              onChange={(e) => handleChange(index, e)}
            />
            <label htmlFor={`tax-${index}`}>消費税率8%</label>
          </div>
        ))}
        <button type="button" onClick={addEntry}>+</button>
        <input type="submit" value="入力完了" />
      </form>
    </div>
  );
};

export default CashbookForm;
