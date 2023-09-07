/* eslint-disable prettier/prettier */

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const base_url = 'https://jade-lucky-leopard.cyclic.cloud';

async function getToken() {
  try {
    const token = await AsyncStorage.getItem('token');

    if (token !== null) {
      return token;
    } else {
      throw new Error('Token tidak ditemukan dalam penyimpanan.');
    }
  } catch (error) {
    console.error('Gagal mengambil token dari penyimpanan:', error);
    throw error;
  }
}

export const postlogin = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({type: 'LOGIN_REQUEST'});
    const result = await axios.post(base_url + '/login', {email, password});
    console.log(result.data);
    if (result.data) {
      dispatch({type: 'LOGIN_SUCCESS', payload: result.data});
      const token = result.data.token;
      AsyncStorage.setItem('token', token);
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

export const updateProfile = (data, id) => async dispatch => {
  const token = await getToken();
  try {
    dispatch({type: 'UPDATE_PROFILE_REQUEST'});
    const response = await axios.put(base_url + `/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);
    dispatch({type: 'UPDATE_PROFILE_SUCCESS', payload: response.data});
  } catch (err) {
    console.error('Error during update user:', err);
    dispatch({type: 'UPDATE_PROFILE_ERROR', payload: err.response.data});
  }
};
