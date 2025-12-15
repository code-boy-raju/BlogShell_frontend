
import API from "../../api/authapi.js";

export const POST_REQUEST = "POST_REQUEST";
export const POST_SUCCESS = "POST_SUCCESS";
export const POST_FAILURE = "POST_FAILURE";

export const GET_MY_POSTS = "GET_MY_POSTS";
export const GET_PUBLISHED_POSTS = "GET_PUBLISHED_POSTS";

// DASHBOARD – get own posts
export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POST_REQUEST });
    const { data } = await API.get("/author/personposts");
    dispatch({ type: GET_MY_POSTS, payload: data.posts });
  } catch (error) {
    dispatch({
      type: POST_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch posts",
    });
  }
};

// CREATE POST
export const createPost = (formData, toast) => async (dispatch) => {
  try {
    dispatch({ type: POST_REQUEST });
    const { data } = await API.post("/author/createposts", formData);
    dispatch({ type: POST_SUCCESS });
    toast.success(data.message);
    dispatch(getMyPosts());
  } catch (error) {
    toast.error(error.response?.data || "Create failed");
    dispatch({ type: POST_FAILURE });
  }
};

// EDIT POST
export const editPost = (id, formData, toast) => async (dispatch) => {
  try {
    dispatch({ type: POST_REQUEST });
    const { data } = await API.put(`/author/editposts/${id}`, formData);
    toast.success(data.message);
    dispatch(getMyPosts());
  } catch (error) {
    toast.error(error.response?.data?.message || "Update failed");
    dispatch({ type: POST_FAILURE });
  }
};

// DELETE POST
export const deletePost = (id, toast) => async (dispatch) => {
  try {
    dispatch({ type: POST_REQUEST });
    const { data } = await API.delete(`/author/deleteposts/${id}`);
    toast.success(data.message);
    dispatch(getMyPosts());
  } catch (error) {
    toast.error("Delete failed");
    dispatch({ type: POST_FAILURE });
  }
};

// VIEW PUBLISHED POSTS
export const getPublishedPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POST_REQUEST });
    const { data } = await API.get("/author/getposts");
    dispatch({ type: GET_PUBLISHED_POSTS, payload: data.posts });
  } catch (error) {
    dispatch({ type: POST_FAILURE });
  }
};
