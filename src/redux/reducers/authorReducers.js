
import {
  POST_REQUEST,
  POST_SUCCESS,
  POST_FAILURE,
  GET_MY_POSTS,
  GET_PUBLISHED_POSTS,
} from "../actions/authorActions.js";

const initialState = {
  loading: false,
  myPosts: [],
  publishedPosts: [],
  error: null,
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REQUEST:
      return { ...state, loading: true };

    case GET_MY_POSTS:
      return { ...state, loading: false, myPosts: action.payload };

    case GET_PUBLISHED_POSTS:
      return { ...state, loading: false, publishedPosts: action.payload };

    case POST_SUCCESS:
      return { ...state, loading: false };

    case POST_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
