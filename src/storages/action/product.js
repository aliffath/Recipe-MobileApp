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
export const postRecipe = formData => async dispatch => {
  const token = await getToken();

  try {
    dispatch({type: 'POST_MENU_PENDING'});
    const response = await axios.post(base_url + '/postRecipe', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response.data);
    dispatch({type: 'POST_MENU_SUCCESS', payload: response.data});
  } catch (err) {
    console.error('Error during post menu user:', err);
    dispatch({type: 'POST_MENU_FAILED', payload: err.response.data.error});
  }
};

export const updateMenu = (data, id) => async dispatch => {
  const token = await getToken();
  try {
    dispatch({type: 'UPDATE_MENU_PENDING'});
    const response = await axios.put(base_url + `/updateRecipe/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({type: 'UPDATE_MENU_SUCCESS', payload: response.data});
  } catch (err) {
    console.error('Error during update menu user:', err);
    dispatch({type: 'UPDATE_MENU_FAILED', payload: err.response.data});
  }
};

export const getDetailmenu = id => async dispatch => {
  const token = await getToken();
  try {
    dispatch({type: 'GET_DETAIL_PENDING'});
    const response = await axios.get(base_url + `/recipe/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({type: 'GET_DETAIL_SUCCESS', payload: response.data});
  } catch (err) {
    console.error('Error during get menu detail:', err);
    dispatch({type: 'GET_DETAIL_FAILED', payload: err.response.data.message});
  }
};
