import axios from "axios";
import React, { useState, useEffect } from "react";
import BackButton from "../BackButton/BackButton";

const CreditbookForm = () => {
  // 入力フォームuseState
  const [date,setDate] = useState("");
  const [gasoline, setGasoline] = useState("");
  const [phone, setPhone] = useState("");
  const [uniform, setUniform] = useState("");
  const [material, setMaterial] = useState("");
  const [etc, setEtc] = useState("");
  const [other, setOther] = useState("");

  // 合計金額管理useState
  const [total, setTotal] = useState(0);

  // 合計金額計算
  useEffect(() => {
    const sum =
      (Number(gasoline) || 0) +
      (Number(phone) || 0) +
      (Number(uniform) || 0) +
      (Number(material) || 0) +
      (Number(etc) || 0) +
      (Number(other) || 0);
    setTotal(sum);
  }, [gasoline, phone, uniform, material, etc, other]);

  // フォームの送信
  const handleSubmit = async (e) => {
    e.preventDefault();
    const entries = {
      date:date,
      gasoline: Number(gasoline),
      phone: Number(phone),
      uniform: Number(uniform),
      material: Number(material),
      etc: Number(etc),
      other: Number(other),
      user_id: 1,
    };
    try {
      const response = await axios.post(
        "http://localhost:3001/api/credit-account",
        entries
      );
      alert("登録しました");
      console.log("Response:", response.data);
    } catch (error) {
      alert("登録に失敗しました");
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <div>
              <label htmlFor="date" className="block md:inline">
                支払い月
              </label>
              <input
                type="month"
                name="date"
                id="date"
                className="border border-gray-500 rounded"
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="gasoline" className="block md:inline">
                ガソリン代
              </label>
              <input
                type="text"
                inputMode="numeric"
                name="gasoline"
                id="gasoline"
                value={gasoline}
                onChange={(e) => setGasoline(Number(e.target.value))}
                className="border border-gray-500 rounded"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block md:inline">
                携帯代
              </label>
              <input
                type="text"
                inputMode="numeric"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(Number(e.target.value))}
                className="border border-gray-500 rounded"
              />
            </div>
            <div>
              <label htmlFor="uniform" className="block md:inline">
                作業着代
              </label>
              <input
                type="text"
                inputMode="numeric"
                name="uniform"
                id="uniform"
                value={uniform}
                onChange={(e) => setUniform(Number(e.target.value))}
                className="border border-gray-500 rounded"
              />
            </div>
            <div>
              <label htmlFor="material" className="block md:inline">
                材料代
              </label>
              <input
                type="text"
                inputMode="numeric"
                name="material"
                id="material"
                value={material}
                onChange={(e) => setMaterial(Number(e.target.value))}
                className="border border-gray-500 rounded"
              />
            </div>
            <div>
              <label htmlFor="etc" className="block md:inline">
                ETC代
              </label>
              <input
                type="text"
                inputMode="numeric"
                name="etc"
                id="etc"
                value={etc}
                onChange={(e) => setEtc(Number(e.target.value))}
                className="border border-gray-500 rounded"
              />
            </div>
            <div>
              <label htmlFor="other" className="block md:inline">
                その他
              </label>
              <input
                type="text"
                inputMode="numeric"
                name="other"
                id="other"
                value={other}
                onChange={(e) => setOther(Number(e.target.value))}
                className="border border-gray-500 rounded"
              />
            </div>
            <div className="">
              <label htmlFor="detail" className="block">
                その他詳細
              </label>
              <textarea
                name="detail"
                id="detail"
                cols="20"
                rows="5"
                className="border border-gray-500 rounded"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-center items-center mt-10 sm:space-x-20 space-x-5">
            <button className="bg-blue-500 hover:bg-blue-300 px-6 py-4 rounded-3xl text-white font-bold">
              入力完了
            </button>
            <BackButton />
          </div>
        </form>
      </div>
      <div className="grid place-items-center mt-10">
        <p id="total" className="font-bold">
          合計：{total} 円
        </p>
      </div>
    </div>
  );
};
export default CreditbookForm;
