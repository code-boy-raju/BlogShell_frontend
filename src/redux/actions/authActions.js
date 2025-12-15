
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT = "LOGOUT";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";

// AUTHOR SIGNUP
import { authorSignupApi, adminSignupApi, loginApi } from "../../api/authapi";

export const authorSignup = (formData) => async (dispatch) => {
  dispatch({ type: AUTH_START });

  try {
    const { data } = await authorSignupApi(formData);

    dispatch({
      type: AUTH_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_FAIL,
      payload: err.response?.data?.message || "Author signup failed",
    });
  }
};


// ADMIN SIGNUP (FILE UPLOAD)
export const adminSignup = (formData) => async (dispatch) => {
  dispatch({ type: AUTH_START });

  try {
    const { data } = await adminSignupApi(formData);

    dispatch({
      type: AUTH_SUCCESS,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_FAIL,
      payload: err.response?.data?.message || "Admin signup failed",
    });
  }
};
;

//login
export const login = (formData, navigate) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await loginApi(formData);

    localStorage.setItem("token", data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });

    if (data.user.role === "admin") {
      navigate("/admindashboard");
    } else if (data.user.role === "author") {
      navigate("/authordashboard");
    } else {
      navigate("/login");
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response?.data?.message || "Login failed",
    });
    throw err;
  }
};
//logout
export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });

};


