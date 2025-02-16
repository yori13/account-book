import React from "react";
import { useLocation } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import axios from "axios";
import HeaderCompornent from '../header/header'; // ヘッダー
import Title from "../contexts/title";

const CashConfirmation = () => {
  // データ受け取り
  const location = useLocation();
  const { data } = location.state || {};
  const title = "確認画面";

  // フォームの送信処理
  const handleSubmit = async (e) => {
    console.log(e.nativeEvent);
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/cash-account",
        data
      );
      console.log("Data submitted successfully:", response.data);
      alert("登録しました");
    } catch (error) {
      alert("登録に失敗しました");
      console.log(data);
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <HeaderCompornent />
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col w-full px-7 mb-10 justify-center">
          <Title title = {title} />
            <table className="table-fixed border border-black text-center">
              <thead>
                <tr className="border border-black">
                  <th className="border border-black">日付</th>
                  <th className="border border-black">費目</th>
                  <th className="border border-black">摘要</th>
                  <th className="border border-black">金額項目</th>
                  <th className="border border-black">金額</th>
                  <th className="border border-black">税率</th>
                </tr>
              </thead>
              <tbody>
                {data && data.map((value, index) => (
                  <tr key={index}>
                    <td className="border border-black">{value.date}</td>
                    <td className="border border-black">{value.itemCode === 1 ? "消耗品" : value.itemCode === 2 ? "交通費": value.itemCode === 3 ? "繰越金額" : ""}</td>
                    <td className="border border-black">{value.memo}</td>
                    <td className="border border-black">{value.priceTypeCode === 1 ? "借型" : value.priceTypeCode === 2 ? "貸型" : "ng"}</td>
                    <td className="border border-black text-right px-1">{value.price}</td>
                    <td className="border border-black text-right px-1">{value.tax === true ? "8%" : "10%"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center grid-cols-2 space-x-3">
            <input
              type="submit"
              value="入力完了"
              className="border border-gray-300 bg-blue-500 hover:bg-blue-300 text-white py-4 px-6 rounded-3xl font-bold mb-5"
            />
            <BackButton />
          </div>
        </form>
    </>
  );
};

export default CashConfirmation;
