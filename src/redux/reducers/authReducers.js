import {
 AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/authActions";


const initialState = {
  loading: false,
  user:null,
  error: null,
  successMessage:null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, loading: true, error: null };

    case AUTH_SUCCESS:
      return { ...state, loading: false, successMessage: action.payload };

    case AUTH_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return { ...state,loading: false, user: action.payload, error: null };
    case LOGIN_FAIL:
      return { ...state,loading: false, user: null, error: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
