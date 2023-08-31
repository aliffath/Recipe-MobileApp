/* eslint-disable prettier/prettier */
import {combineReducers} from 'redux';

import authReducer from './authReducer';

const appReducers = combineReducers({
  authReducer,
});

export default appReducers;
