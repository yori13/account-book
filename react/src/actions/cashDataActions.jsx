export const cashData = (entries) => {
  return async (dispatch) => {
    // type: 'CASH_DATA',
    // payload: entries
    try {
      const response = await fetch('http://localhost:3000/api/get-cash-account');
      const data = await response.json();
      console.log(data); // データ確認用
      dispatch({
        type: 'CASH_DATA',
        payload: data
      });
    } catch (error) {
      console.error('データ取得エラー:', error);
    }
  }
}

export default cashData;