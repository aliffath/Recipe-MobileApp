/* eslint-disable prettier/prettier */
import axios from 'axios';

const base_url = 'https://jade-lucky-leopard.cyclic.cloud';

export const postlogin = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({type: 'LOGIN_REQUEST'});
    const result = await axios.post(base_url + '/login', {email, password});
    console.log('result data ', result.data);

    if (result.data) {
      dispatch({type: 'LOGIN_SUCCESS', payload: result.data});
    }
  } catch (err) {
    console.log('err');
    console.log(err.response.data.message);
    dispatch({type: 'LOGIN_ERROR', payload: err.response.data.message});
  }
};

export const postRegister =
  (name, email, password) => async (dispatch, getState) => {
    try {
      dispatch({type: 'REGISTER_REQUEST'});
      const result = await axios.post(base_url + '/register', {
        name,
        email,
        password,
      });
      console.log('result data ', result.data);

      if (result.data) {
        dispatch({type: 'REGISTER_SUCCESS', payload: result.data});
      }
    } catch (err) {
      console.log('err');
      console.log(err.response.data.message);
      dispatch({type: 'REGISTER_ERROR', payload: err.response.data.message});
    }
  };

export const logout = () => {
  return (dispatch, getState) => {
    console.log();
    dispatch({type: 'DELETE_TOKEN'});
  };
};
