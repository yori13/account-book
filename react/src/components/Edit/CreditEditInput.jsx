import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as useLocation, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import HeaderCompornent from "../header/header";
import BackButton from "../BackButton/BackButton";
import creditReset from "../../actions/creditResetActions";
import axios from "axios";

const CreditEditInput = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const creditDataItems = useSelector((state) => state.creditDataEntries,[]);
  const creditDetail = useSelector((state) => state.creditDetailEntries,[]);
  const category =[
    "ガソリン",
    "携帯代",
    "作業着代",
    "材料費",
    "ETC代",
    "その他"
  ];
  const state = location.state;
  const id = state.map((item) => String(item.id));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  const defaultValues = id.reduce((acc, currentId, index) => {
    acc[currentId] = state[index].credit_price;
    return acc;
  }, {
    date: formatDate(state[0].date),
    detail: creditDetail?.[state[0]?.category_detail_code] || "",
  });

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues,
  });
  console.log(id);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/get-credit-update",
        data
      );
      if(response.status === 200){
        alert('データを更新しました');
        dispatch(creditReset());
        navigate('/top');
      }else{
        alert('データ更新に失敗しました：' + response.status);
        console.log(response.status);
      }
    } catch (error) {
      alert('データ更新に失敗しました：' + error.message);
      console.error("Error submitting data:", error);
    }
  }
  return(
    <>
      <HeaderCompornent/>
      <div className="text-center mb-5 mt-5 text-xl font-bold">クレジット編集画面</div>
      <div className="text-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inline-block text-left space-y-4">
            <div className="flex items-center">
              <label htmlFor="date" className="w-24 text-right mr-4">期間：</label>
              <Controller
                  name="date"
                  control={control}
                  render={({ field }) => <input type="text" className="border border-brack h-10 w-44" {...field} readOnly />}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="gasoline" className="w-24 text-right mr-4">ガソリン：</label>
              <Controller
                  name={id[0]}
                  control={control}
                  render={({ field }) => <input type="text" className="border border-brack h-10 w-44" {...field} />}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="phone" className="w-24 text-right mr-4">携帯代：</label>
              <Controller
                  name={id[1]}
                  control={control}
                  render={({ field }) => <input type="text" className="border border-brack h-10 w-44" {...field} />}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="uniform" className="w-24 text-right mr-4">作業着代：</label>
              <Controller
                  name={id[2]}
                  control={control}
                  render={({ field }) => <input type="text" className="border border-brack h-10 w-44" {...field} />}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="material" className="w-24 text-right mr-4">材料費：</label>
              <Controller
                  name={id[3]}
                  control={control}
                  render={({ field }) => <input type="text" className="border border-brack h-10 w-44" {...field} />}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="etc" className="w-24 text-right mr-4">ETC代：</label>
              <Controller
                  name={id[4]}
                  control={control}
                  render={({ field }) => <input type="text" className="border border-brack h-10 w-44" {...field} />}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="other" className="w-24 text-right mr-4">その他：</label>
              <Controller
                  name={id[5]}
                  control={control}
                  render={({ field }) => <input type="text" className="border border-brack h-10 w-44" {...field} />}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-center space-x-10">
            <input type="submit" value="更新" className="border border-gray-300 bg-blue-500 hover:bg-blue-300 text-white py-4 px-6 rounded-3xl font-bold w-28" />
            <BackButton/>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreditEditInput;