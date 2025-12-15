import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import { authReducer } from "./reducers/authReducers.js";
import { postReducer } from "./reducers/authorReducers.js";
import { adminReducer } from "./reducers/adminReducer.js";
const rootReducer = combineReducers({
auth: authReducer,
post: postReducer,
admin: adminReducer,
});


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));