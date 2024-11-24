const initialState = {
  creditConfirmEntries: {},
  cashDataEntries: []
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ENTRIES':
      return {
        ...state,
        creditConfirmEntries: { ...state.creditConfirmEntries, ...action.payload } // 既存のエントリを維持しつつ、更新
      };
    case 'CASH_DATA':
      return{
        ...state,
        cashDataEntries: action.payload
      };
    default:
      return state;
  }
};

export default Reducer;
