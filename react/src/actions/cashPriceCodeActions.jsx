export const cashPriceCode = () =>{
  return async (dispatch) => {
    try{
      const response = await fetch('http://localhost:3000/api/get-cash-price-code');
      const data = await response.json();
      const array = Object.values(data);
      dispatch({
        type: 'CASH_PRICE_CODE',
        payload: array
      })
    }catch(error){
      console.error('cashPriceCode取得失敗：',error);
    }
  }
}

export default cashPriceCode;