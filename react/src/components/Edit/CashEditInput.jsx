import React, { useState } from "react";
import BackButton from "../BackButton/BackButton";
import { BrowserRouter as useLocation,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import HeaderCompornent from "../header/header";
import { useForm, Controller } from "react-hook-form";  // React Hook Formをインポート
import CashReset from '../../actions/cashResetActions';


const CashEditInput = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = location.state || {};
  const itemsArray = useSelector((state) => state.cashItemEntries) || [];
  const priceTypeArray = useSelector((state) => state.cashPriceCodeEntries) || [];
  console.log(state);
  // React Hook Formのセットアップ
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      id: state.id || "",
      date: state.date || "",
      item_code: state.item_code || "",
      memo: state.memo || "",
      price_type_code: state.price_type_code || "",
      price: state.price || "",
      tax: state.tax || false
    }
  });

  // サーバーへデータ送信する関数
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/get-cash-update",
        data
      );
      if(response.status === 200){
        alert('データを更新しました');
        dispatch(CashReset());
        navigate('/top');
      }else{
        alert('データ更新に失敗しました：' + response.status);
        console.log(response.status);
      }
    } catch (error) {
      alert('データ更新に失敗しました：' + error.message);
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <HeaderCompornent />
      <div className="flex justify-center">
        <h1 className="text-xl mt-5 mb-5">編集入力画面</h1>
      </div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller name="id" control={control} render={({field}) => <input type="hidden" {...field}/>} />
          <div className="text-left space-y-5 mb-10">
            <div>
              <label htmlFor="date">日付：</label>
              <Controller
                name="date"
                control={control}
                render={({ field }) => <input type="text" className="border border-brack h-10 w-44" {...field} readOnly />}
              />
            </div>
            <div>
              <label htmlFor="item_code">費目：</label>
              <Controller
                name="item_code"
                control={control}
                render={({ field }) => (
                  <select {...field} className="border border-brack h-10 w-44">
                    {itemsArray.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.item_name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div>
              <label htmlFor="memo">摘要：</label>
              <Controller
                name="memo"
                control={control}
                render={({ field }) => <input type="text" {...field} className="border border-brack h-10 w-44" />}
              />
            </div>
            <div>
              <label htmlFor="price_type_code">金額種別：</label>
              <Controller
                name="price_type_code"
                control={control}
                render={({ field }) => (
                  <select {...field} className="border border-brack h-10 w-36">
                    {priceTypeArray.map((priceType) => (
                      <option key={priceType.id} value={priceType.id}>
                        {priceType.price_type}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
            <div>
              <label htmlFor="price">金額：</label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => <input type="text" {...field} className="border border-brack h-10 w-44" />}
              />
            </div>
            <div>
              <label htmlFor="tax">税率8%:</label>
              <Controller
                name="tax"
                control={control}
                render={({ field }) => (
                  <input type="checkbox" {...field} checked={field.value} />
                )}
              />
            </div>
          </div>
          <div className="flex justify-center space-x-3">
            <input type="submit" value="更新" className="border border-gray-300 bg-blue-500 hover:bg-blue-300 text-white py-4 px-6 rounded-3xl font-bold w-28" />
            <BackButton />
          </div>
        </form>
      </div>
    </>
  );
};

export default CashEditInput;