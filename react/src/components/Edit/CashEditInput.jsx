import React, { useState } from "react";
import BackButton from "../BackButton/BackButton";
import { useLocation,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import HeaderCompornent from "../header/header";
import { useForm, Controller } from "react-hook-form";  // React Hook Formをインポート

const CashEditInput = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
      navigate("/");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <HeaderCompornent />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller name="id" control={control} render={({field}) => <input type="hidden" {...field}/>} />
          <div>
            <div>
              <label htmlFor="date">日付：</label>
              <Controller
                name="date"
                control={control}
                render={({ field }) => <input type="text" {...field} readOnly />}
              />
            </div>
            <div>
              <label htmlFor="item_code">費目：</label>
              <Controller
                name="item_code"
                control={control}
                render={({ field }) => (
                  <select {...field}>
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
                render={({ field }) => <input type="text" {...field} />}
              />
            </div>
            <div>
              <label htmlFor="price_type_code">金額種別：</label>
              <Controller
                name="price_type_code"
                control={control}
                render={({ field }) => (
                  <select {...field}>
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
                render={({ field }) => <input type="text" {...field} />}
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
          <div>
            <input type="submit" value="更新" className="bg-blue-500 text-white" />
          </div>
        </form>
        <div>
          <BackButton />
        </div>
      </div>
    </>
  );
};

export default CashEditInput;