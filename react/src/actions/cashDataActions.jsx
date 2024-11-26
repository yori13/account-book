export const cashData = (entries) => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/api/get-cash-account');
      const data = await response.json();
      const array = Object.values(data);
      dispatch({
        type: 'CASH_DATA',
        payload: array
      });
    } catch (error) {
      console.error('cashData取得失敗：', error);
    }
  }
}

export default cashData;