import { combineReducers } from "redux";
import settingsReducer from "./settings/reducer";
import supportReducer from "./support/reducer";

export const rootReducer = combineReducers({ settingsReducer, supportReducer });
export type RootState = ReturnType<typeof rootReducer>;
