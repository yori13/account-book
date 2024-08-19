import React from "react";

const CashbookForm = () =>{
  return(
    <div>
      <form action="" method="post">
        <label htmlFor="date">日付</label>
        <input type="date" name="date" id="date" />
        <label htmlFor="select-item">費目</label>
        <input type="select" name="select-item" id="select-item" />
        <label htmlFor="memo">摘要</label>
        <input type="text" name="memo" id="memo" />
        <input type="radio" name="price-radio" id="debit" />
        <label htmlFor="debit">借方</label>
        <input type="radio" name="price-radio" id="credit" />
        <label htmlFor="credit">貸方</label>
        <input type="radio" name="price-radio" id="brought-forward" />
        <label htmlFor="brought-firward">繰越金額</label>
        <input type="number" name="price" id="price" />
        <input type="checkbox" name="tax-flg" id="tax-flg" />
        <label htmlFor="tax-flg">消費税率8%</label>
        <input type="submit" value='入力完了' />
      </form>
    </div>
  );
}

export default CashbookForm;