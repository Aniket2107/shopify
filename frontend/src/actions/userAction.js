import axios from "axios";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAILS_RESET,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants.js";

import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";

export const login = (email, password) => async (dispatch) => {
  console.log(email, password);

  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      email,
      password,
    };

    axios
      .post("/api/users/login", body, config)
      .then((res) => {
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res.data,
        });
        console.log(res);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      })
      .catch((err) => {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });

        console.log(err.response.data.message);
      });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: USER_DETAILS_RESET,
  });
  dispatch({
    type: ORDER_LIST_MY_RESET,
  });
  dispatch({
    type: USER_LIST_RESET,
  });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = {
      name,
      email,
      password,
    };

    axios
      .post("/api/users", body, config)
      .then((res) => {
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: res.data,
        });

        localStorage.setItem("userInfo", JSON.stringify(res.data));
      })
      .catch((err) => {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .get(`/api/users/${id}`, config)
      .then((res) => {
        dispatch({
          type: USER_DETAILS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: USER_DETAILS_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .put(`/api/users/profile`, user, config)
      .then((res) => {
        dispatch({
          type: USER_UPDATE_PROFILE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: USER_UPDATE_PROFILE_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUser = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .get(`/api/users`, config)
      .then((res) => {
        dispatch({
          type: USER_LIST_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: USER_LIST_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    axios
      .delete(`/api/users/${id}`, config)
      .then((res) => {
        dispatch({
          type: USER_DELETE_SUCCESS,
        });
      })
      .catch((err) => {
        dispatch({
          type: USER_DELETE_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const UpdateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios
      .put(`/api/users/${user._id}`, user, config)
      .then((res) => {
        dispatch({
          type: USER_UPDATE_SUCCESS,
        });
        dispatch({
          type: USER_DETAILS_SUCCESS,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: USER_UPDATE_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
