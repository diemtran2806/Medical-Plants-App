const auth = (state, {type, payload}) => {
  if (type === 'REGISTER_LOADING' || type === 'LOGIN_LOADING') {
    return {
      ...state,
      loading: true,
    };
  }
  if (type === 'REGISTER_SUCCESS') {
    return {
      ...state,
      loading: false,
      data: payload,
    };
  }
  if (type === 'LOGIN_SUCCESS') {
    return {
      ...state,
      loading: false,
      data: payload,
      isLoggedIn: true,
    };
  }
  if (type === 'REGISTER_FAIL' || type === 'LOGIN_FAIL') {
    return {
      ...state,
      loading: false,
      error: payload,
    };
  }
  if (type === 'CLEAR_AUTH_STATE') {
    return {
      ...state,
      loading: false,
      data: null,
      error: null,
    };
  }

  if (type === 'LOGOUT_USER') {
    return {
      ...state,
      loading: false,
      data: null,
      isLoggedIn: false,
    };
  }

  if (type === 'UPDATE_USER_SUCCESS') {
    return {
      ...state,
      loading: false,
      data: payload,
      isLoggedIn: true,
    };
  }
  return state;
};

export default auth;
