export const updateEntries = (entries) => {
  return {
    type: 'UPDATE_ENTRIES', // ここを修正
    payload: entries,
  };
};
