import API from "../../api/authapi.js";

export const ADMIN_REQUEST = "ADMIN_REQUEST";
export const ADMIN_FAILURE = "ADMIN_FAILURE";

export const ADMIN_DASHBOARD = "ADMIN_DASHBOARD";
export const ADMIN_AUTHORS = "ADMIN_AUTHORS";
export const ADMIN_POSTS = "ADMIN_POSTS";
export const ADMIN_SEARCH = "ADMIN_SEARCH";

// DASHBOARD
export const getAuthorDetails = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_REQUEST });
    const { data } = await API.get("/admin/details");
    dispatch({ type: ADMIN_DASHBOARD, payload: data });
  } catch {
    dispatch({ type: ADMIN_FAILURE });
  }
};

// GET AUTHORS
export const getAuthors = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_REQUEST });
    const { data } = await API.get("/admin/authors");
    dispatch({ type: ADMIN_AUTHORS, payload: data });
  } catch {
    dispatch({ type: ADMIN_FAILURE });
  }
};

// ADD AUTHOR
export const addAuthor = (form, toast) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_REQUEST });
    await API.post("/admin/addauthor", form);
    toast.success("Author created");
    dispatch(getAuthors());
  } catch {
    toast.error("Failed to add author");
    dispatch({ type: ADMIN_FAILURE });
  }
};

// ASSIGN PERMISSIONS
export const assignPermissions = (id, permissions, toast) => async () => {
  try {
    await API.put(`/admin/permission/${id}`, permissions);
    toast.success("Permissions updated");
  } catch {
    toast.error("Permission update failed");
  }
};

// TOGGLE STATUS
export const toggleAuthor = (id, toast) => async (dispatch) => {
  try {
    await API.put(`/admin/status/${id}`);
    toast.success("Status updated");
    dispatch(getAuthors());
  } catch {
    toast.error("Status update failed");
  }
};

// DELETE AUTHOR
export const deleteAuthor = (id, toast) => async (dispatch) => {
  try {
    await API.delete(`/admin/removeauthor/${id}`);
    toast.success("Author deleted");
    dispatch(getAuthors());
  } catch {
    toast.error("Delete failed");
  }
};

// MANAGE POSTS
export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_REQUEST });
    const { data } = await API.get("/admin/posts");
    dispatch({ type: ADMIN_POSTS, payload: data });
  } catch {
    dispatch({ type: ADMIN_FAILURE });
  }
};

// ADMIN EDIT POST
export const adminEditPost = (id, form, toast) => async (dispatch) => {
  try {
    await API.put(`/admin/editposts/${id}`, form);
    toast.success("Post updated successfully");
    dispatch(getAllPosts());
  } catch {
    toast.error("Failed to update post");
  }
};

// ADMIN DELETE POST
export const adminDeletePost = (id, toast) => async (dispatch) => {
  try {
    await API.delete(`/admin/deletepost/${id}`);
    toast.success("Post deleted");
    dispatch(getAllPosts());
  } catch {
    toast.error("Delete failed");
  }
};
