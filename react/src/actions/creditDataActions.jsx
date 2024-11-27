export const creditData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/api/get-credit-account');
      const data = await response.json();
      const array = Object.values(data);
      dispatch({
        type: 'CREDIT_DATA',
        payload: array
      });
    } catch (error) {
      console.error('creditData取得失敗：', error);
    }
  }
}

export default creditData;