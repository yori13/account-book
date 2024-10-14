import { createStore } from 'redux';
import creditReducer from '../reducers/CreditReducer';

const creditStore = createStore(creditReducer);

export default creditStore;