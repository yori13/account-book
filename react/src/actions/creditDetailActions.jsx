export const creditDetail = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('http://localhost:3000/api/get-credit-detail');
      const data = await response.json();
      const array = Object.values(data);
      dispatch({
        type: 'CREDIT_DETAIL',
        payload: array
      });
    } catch (error) {
      console.error('creditDetail取得失敗：', error);
    }
  }
}

export default creditDetail;