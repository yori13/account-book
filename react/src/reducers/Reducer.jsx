const initialState = {
  creditConfirmEntries: {},
  cashDataEntries: [],
  cashItemEntries: [],
  cashPriceCodeEntries: [],
  creditDataEntries: [],
  creditDetailEntries: []
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CREDIT_FORM':
      return {
        ...state,
        creditConfirmEntries: { ...state.creditConfirmEntries, ...action.payload } // 既存のエントリを維持しつつ、更新
      };
    case 'CASH_DATA':
      return{
        ...state,
        cashDataEntries: action.payload
      };
    case 'CASH_ITEM':
      return{
        ...state,
        cashItemEntries: action.payload
      }
    case 'CASH_PRICE_CODE':
      return{
        ...state,
        cashPriceCodeEntries: action.payload
      }
    case 'CREDIT_DATA':
      return{
        ...state,
        creditDataEntries: action.payload
      }
    case 'CREDIT_DETAIL':
      return{
        ...state,
        creditDetailEntries: action.payload
      }
    default:
      return state;
  }
};

export default Reducer;
