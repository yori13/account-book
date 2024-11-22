const initialState = {
  entries: {} // 初期状態の設定
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ENTRIES':
      return {
        ...state,
        entries: { ...state.entries, ...action.payload } // 既存のエントリを維持しつつ、更新
      };
    default:
      return state;
  }
};

export default Reducer;
