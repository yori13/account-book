import React, { useState } from "react";
import HeaderCompornent from '../header/header'; // ヘッダー
import CashEditPage from '../Edit/CashEditPage';
import CreditEditPage from '../Edit/CreditEditPage';
import Backbutton from '../BackButton/BackButton';

const EditPage = () => {
  const [tabState, setTabState] = useState("cash");
  
  const tabClick = (el) => {
    setTabState(el);
  }
  
  return (
      <>
        <HeaderCompornent />
          <div>
            <div className="mb-5">
              <h1>編集</h1>
            </div>
            <div className="border">
              <div>
                <ul className="grid grid-cols-2">
                  <li className="border">
                    <button onClick={ () => tabClick('cash') } className={tabState == "cash" ? "bg-blue-400 w-full text-white text-3xl" : "bg-slate-400 w-full text-black text-3xl"} >現金</button>
                  </li>
                  <li className="border">
                    <button onClick={ () => tabClick('credit') } className={tabState == "credit" ? "bg-blue-400 w-full text-white text-3xl" : "bg-slate-400 w-full text-black text-3xl"}>クレジット</button>
                  </li>
                </ul>
              </div>
              <div className={tabState === 'cash' ? '' : 'hidden' } id="cash-wrapper">
                <CashEditPage/>
              </div>
              <div className={tabState === 'credit' ? '' : 'hidden' } id="credit-wrapper">
                <CreditEditPage/>
              </div>
            </div>
            <div className="mt-5 text-center">
              <Backbutton />
            </div>
          </div>
      </>
  );
};

export default EditPage;
