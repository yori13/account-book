export const cashItem = (entries) =>{
  return async (dispatch) => {
    try{
      const response = await fetch('http://localhost:3000/api/get-cash-item');
      const data = await response.json();
      const array = Object.values(data);
      console.log(array);
      dispatch({
        type: 'CASH_ITEM',
        payload: array
      })
    }catch(error){
      console.error('cashItem取得失敗：',error);
    }
  }
}

export default cashItem;