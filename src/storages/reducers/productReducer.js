/* eslint-disable prettier/prettier */
const initialState = {
  data: null,
  errorMessage: '',
  isLoading: false,
  isError: false,
};

const productReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'POST_MENU_PENDING':
    case 'UPDATE_MENU_PENDING':
    case 'GET_DETAIL_PENDING':
      return {
        ...state,
        isLoading: true,
      };
    case 'POST_MENU_SUCCESS':
    case 'UPDATE_MENU_SUCCESS':
    case 'GET_DETAIL_SUCCESS':
      return {
        ...state,
        data: payload,
        isLoading: false,
        errorMessage: '',
        isError: false,
      };
    case 'POST_MENU_FAILED':
    case 'UPDATE_MENU_FAILED':
    case 'GET_DETAIL_FAILED':
      return {
        ...state,
        data: null,
        errorMessage: payload,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default productReducer;
