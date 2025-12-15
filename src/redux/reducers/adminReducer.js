import {
  ADMIN_REQUEST,
  ADMIN_FAILURE,
  ADMIN_DASHBOARD,
  ADMIN_AUTHORS,
  ADMIN_POSTS,
  ADMIN_SEARCH,
} from "../actions/adminActions.js";

const initialState = {
  loading: false,
  details: [],
  authors: [],
  posts: [],
  searchText: "",
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_REQUEST:
      return { ...state, loading: true };

    case ADMIN_DASHBOARD:
      return { ...state, loading: false, details: action.payload };

    case ADMIN_AUTHORS:
      return { ...state, loading: false, authors: action.payload };

    case ADMIN_POSTS:
      return { ...state, loading: false, posts: action.payload };

    case ADMIN_SEARCH:
      return { ...state, searchText: action.payload };

    case ADMIN_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
