import React, { useState } from "react";
import axios from "axios";
import BackButton from "../BackButton/BackButton";

const CashbookForm = () => {
  // 初期のフォームデータセットを空の配列で初期化
  const [entries, setEntries] = useState([
    {
      date: "",
      itemCode: "",
      memo: "",
      priceTypeCode: "",
      price: "",
      tax: false,
    },
  ]);

  // フォームの入力値を更新する関数
  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const updatedEntries = [...entries];

    if (type === "radio") {
      updatedEntries[index] = {
        ...updatedEntries[index],
        priceTypeCode: parseInt(value, 10),
      };
    } else if (type === "checkbox") {
      updatedEntries[index] = { ...updatedEntries[index], [name]: checked };
    } else if (name === "itemCode") {
      updatedEntries[index] = {
        ...updatedEntries[index],
        itemCode: parseInt(value, 10),
      };
    } else {
      updatedEntries[index] = { ...updatedEntries[index], [name]: value };
    }

    setEntries(updatedEntries);
  };

  // 新しいフォームセットを追加する関数
  const addEntry = () => {
    setEntries([
      ...entries,
      {
        date: "",
        itemCode: "",
        memo: "",
        priceTypeCode: "",
        price: "",
        tax: false,
      },
    ]);
  };
  // フォームを削除する関数
  const removeForm = () => {
    // 少なくとも1つのフォームは残るようにする
    if (entries.length > 1) {
      setEntries(entries.slice(0, -1));
    }
  };
  // フォームの送信処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/cash-account",
        entries
      );
      console.log("Data submitted successfully:", response.data);
      alert("登録しました");
    } catch (error) {
      alert("登録に失敗しました");
      console.log(entries);
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {entries.map((entry, index) => (
          <div
            key={index}
            className="grid sm:grid-cols-3 grid-cols-2 sm:space-x-10 space-x-3 mb-10"
          >
            <div className="sm:ml-10 m-auto ml-3 mb-3">
              <label htmlFor={`date-${index}`}>日付</label>
              <input
                type="date"
                name="date"
                id={`date-${index}`}
                value={entry.date}
                onChange={(e) => handleChange(index, e)}
                className="border border-gray-400 rounded-md px-5 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor={`select-item-${index}`}>費目</label>
              <select
                name="itemCode"
                id={`select-item-${index}`}
                value={entry.itemCode}
                onChange={(e) => handleChange(index, e)}
                className="border border-gray-400 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={0}>選択してください</option>
                <option value={3}>繰越</option>
                <option value={1}>消耗品</option>
                <option value={2}>交通費</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor={`memo-${index}`}>摘要</label>
              <input
                type="text"
                name="memo"
                id={`memo-${index}`}
                value={entry.memo}
                onChange={(e) => handleChange(index, e)}
                className="border border-gray-400 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="m-auto">
              <input
                type="radio"
                name={`priceTypeCode-${index}`}
                value={1}
                id={`debit-${index}`}
                checked={entry.priceTypeCode === 1}
                onChange={(e) => handleChange(index, e)}
              />
              <label htmlFor={`debit-${index}`} className="mr-2">借方</label>

              <input
                type="radio"
                name={`priceTypeCode-${index}`}
                value={2}
                id={`credit-${index}`}
                checked={entry.priceTypeCode === 2}
                onChange={(e) => handleChange(index, e)}
              />
              <label htmlFor={`credit-${index}`} className="mr-2">貸方</label>

              <input
                type="radio"
                name={`priceTypeCode-${index}`}
                value={3}
                id={`brought-forward-${index}`}
                checked={entry.priceTypeCode === 3}
                onChange={(e) => handleChange(index, e)}
              />
              <label htmlFor={`brought-forward-${index}`}>繰越金額</label>
            </div>
            <div className="m-auto">
              <label htmlFor={`price-${index}`}>金額</label>
              <input
                type="number"
                name="price"
                id={`price-${index}`}
                value={entry.price}
                onChange={(e) => handleChange(index, e)}
                className="border border-gray-400 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="m-auto">
              <input
                type="checkbox"
                name="tax"
                id={`tax-${index}`}
                checked={entry.tax}
                onChange={(e) => handleChange(index, e)}
              />
              <label htmlFor={`tax-${index}`}>消費税率8%</label>
            </div>
          </div>
        ))}
        <div className="">
          <div className="flex justify-center space-x-10 mb-10">
            <button
              type="button"
              onClick={addEntry}
              className="border border-gray-500 bg-stone-500 text-white px-6 py-4 rounded-full text-xl font-bold"
            >
              +
            </button>
            <button
              type="button"
              onClick={removeForm}
              className="border border-gray-500 bg-stone-500 text-white px-6 py-4 rounded-full text-xl font-bold"
            >
              -
            </button>
          </div>
          <div className="flex justify-center grid-cols-2 space-x-3">
            <div>
              <input
                type="submit"
                value="入力完了"
                className="border border-gray-300 bg-blue-500 hover:bg-blue-300 text-white py-4 px-6 rounded-3xl font-bold mb-5"
              />
            </div>
          </div>
        </div>
      </form>
      <div className="flex justify-center grid-cols-2 space-x-3">
        <BackButton className="border border-gray-300" />
      </div>
    </div>
  );
};

export default CashbookForm;
