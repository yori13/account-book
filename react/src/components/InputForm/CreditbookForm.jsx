import React from "react";

const CreditbookForm = () =>{
  return(
    <div>
      <form action="" method="post">
        <label htmlFor="date">年月</label>
        <input type="month" name="date" id="date" />
        <label htmlFor="gasoline">ガソリン代</label>
        <input type="number" name="gasoline" id="gasoline" />
        <label htmlFor="phone">携帯代</label>
        <input type="number" name="phone" id="phone" />
        <label htmlFor="uniform">作業着代</label>
        <input type="number" name="uniform" id="uniform" />
        <label htmlFor="material">材料代</label>
        <input type="number" name="material" id="material" />
        <label htmlFor="etc">ETC代</label>
        <input type="number" name="etc" id="etc" />
        <label htmlFor="other">その他</label>
        <input type="number" name="other" id="other" />
        <label htmlFor="detail">その他詳細</label>
        <textarea name="detail" id="detail" cols="30" rows="10"></textarea>
      </form>
    </div>
  );
}
export default CreditbookForm