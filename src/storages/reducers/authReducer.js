/* eslint-disable prettier/prettier */
const InitialState = {
  data: null,
  isLoading: false,
  isError: false,
  messageError: '',
  isSuccess: true,
};

const authReducer = (state = InitialState, {type, payload}) => {
  switch (type) {
    case 'LOGIN_REQUEST':
    case 'REGISTER_REQUEST':
    case 'UPDATE_PROFILE_REQUEST':
      return {
        ...state,
        isLoading: true,
        isError: false,
        isSuccess: false,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
    case 'UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isSuccess: true,
        data: payload,
      };
    case 'LOGIN_ERROR':
    case 'REGISTER_ERROR':
    case 'UPDATE_PROFILE_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isSuccess: false,
        messageError: payload,
      };
    case 'DELETE_TOKEN':
      return {
        ...state,
        data: null,
        isLoading: false,
        isError: false,
        isSuccess: true,
      };
    default:
      return state;
  }
};

export default authReducer;
