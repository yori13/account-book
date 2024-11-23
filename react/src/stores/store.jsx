import { createStore, applyMiddleware } from 'redux';
import Reducer from '../reducers/Reducer';
import { thunk } from 'redux-thunk';


const Store = createStore(
  Reducer,
  applyMiddleware(thunk)
);

export default Store;