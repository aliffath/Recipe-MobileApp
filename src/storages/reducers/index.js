/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';

import authReducer from './authReducer';
import productReducer from './productReducer';
const appReducers = combineReducers({
  authReducer,
  productReducer,
});

export default appReducers;
