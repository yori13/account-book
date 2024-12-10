import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
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
  console.log(state);
  console.log(location);


  const id = state.map((item) => String(item.id));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  const defaultValues = id.reduce((acc, currentId, index) => {
    acc[currentId] = state[index].credit_price; // 動的にキーを生成
    return acc;
  }, {
    date: formatDate(state[0].date), // date は固定で設定
    detail: creditDetail?.[state[0]?.category_detail_code] || "",
  });
  console.log(defaultValues);

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues,
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/get-credit-update",
        data
      );
      if(response.status === 200){
        alert('データを更新しました');
        dispatch(creditReset());
        navigate('/');
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
    <div>クレジット編集画面</div>
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label htmlFor="date">期間：</label>
            <Controller
                name="date"
                control={control}
                render={({ field }) => <input type="text" className="border border-brack h-10 w-44" {...field} readOnly />}
            />
          </div>
          <div>
            <label htmlFor="gasoline">ガソリン：</label>
            <Controller
                name={id[0]}
                control={control}
                render={({ field }) => <input type="text" className="border border-brack h-10 w-44" {...field} />}
            />
          </div>
          <div>
            <label htmlFor="phone">携帯代：</label>
            <Controller
                name={id[1]}
                control={control}
                render={({ field }) => <input type="text" className="border border-brack h-10 w-44" {...field} />}
            />
          </div>
          <div>
            <label htmlFor="uniform">作業着代：</label>
            <Controller
                name={id[2]}
                control={control}
                render={({ field }) => <input type="text" className="border border-brack h-10 w-44" {...field} />}
            />
          </div>
          <div>
            <label htmlFor="material">材料費：</label>
            <Controller
                name={id[3]}
                control={control}
                render={({ field }) => <input type="text" className="border border-brack h-10 w-44" {...field} />}
            />
          </div>
          <div>
            <label htmlFor="etc">ETC代：</label>
            <Controller
                name={id[4]}
                control={control}
                render={({ field }) => <input type="text" className="border border-brack h-10 w-44" {...field} />}
            />
          </div>
          <div>
            <label htmlFor="other">その他：</label>
            <Controller
                name={id[5]}
                control={control}
                render={({ field }) => <input type="text" className="border border-brack h-10 w-44" {...field} />}
            />
          </div>
        </div>
        <div>
        <input type="submit" value="更新" className="border border-gray-300 bg-blue-500 hover:bg-blue-300 text-white py-4 px-6 rounded-3xl font-bold w-28" />
          <BackButton/>
      </div>
      </form>
    </div>
    </>
  );
}

export default CreditEditInput;