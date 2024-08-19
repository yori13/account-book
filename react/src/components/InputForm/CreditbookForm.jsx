import React, { useState, useEffect } from "react";

const CreditbookForm = () =>{
  // 入力フォームuseState
  const [gasoline, setGasoline] = useState('');
  const [phone, setPhone] = useState('');
  const [uniform, setUniform] = useState('');
  const [material, setMaterial] = useState('');
  const [etc, setEtc] = useState('');
  const [other, setOther] = useState('');

  // 合計金額管理useState
  const [total, setTotal] = useState(0);

  // 合計金額計算
  useEffect(() =>{
    const sum = (Number(gasoline) || 0) +
    (Number(phone) || 0) +
    (Number(uniform) || 0) +
    (Number(material) || 0) +
    (Number(etc) || 0) +
    (Number(other) || 0);
    setTotal(sum);
  }, [gasoline, phone, uniform, material, etc, other]);
  
  return(
    <div>
      <form action="" method="post">
        <label htmlFor="date">年月</label>
        <input type="month" name="date" id="date" />
        <label htmlFor="gasoline">ガソリン代</label>
        <input type="number" name="gasoline" id="gasoline" value={gasoline} onChange={(e) => setGasoline(Number(e.target.value))} />
        <label htmlFor="phone">携帯代</label>
        <input type="number" name="phone" id="phone" value={phone} onChange={(e) => setPhone(Number(e.target.value))} />
        <label htmlFor="uniform">作業着代</label>
        <input type="number" name="uniform" id="uniform" value={uniform} onChange={(e) => setUniform(Number(e.target.value))}/>
        <label htmlFor="material">材料代</label>
        <input type="number" name="material" id="material" value={material} onChange={(e) => setMaterial(Number(e.target.value))}/>
        <label htmlFor="etc">ETC代</label>
        <input type="number" name="etc" id="etc" value={etc} onChange={(e) => setEtc(Number(e.target.value))}/>
        <label htmlFor="other">その他</label>
        <input type="number" name="other" id="other" value={other} onChange={(e) => setOther(Number(e.target.value))}/>
        <label htmlFor="detail">その他詳細</label>
        <textarea name="detail" id="detail" cols="30" rows="10"></textarea>
      </form>
      <p id="total">合計：{total} 円</p>
    </div>
  );
}
export default CreditbookForm