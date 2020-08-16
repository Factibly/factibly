import { combineReducers } from "redux";
import screenReducers from "./app/screen-reducers";
import supportReducers from "./support/support-reducers";

export default combineReducers({ screenReducers, supportReducers });
