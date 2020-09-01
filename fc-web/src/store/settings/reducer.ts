import { Reducer } from "redux";
import { SettingsReduxState, SettingsReduxAction, CHANGE_WEBSITE_LOCALE, CHANGE_PREFERS_DARK_MODE } from "./types";
import { SITE_LOCALE_KEY, PREFERS_DARK_MODE_KEY } from "../../static/keys/local-storage-keys";

const initializePrefersDarkMode = (): boolean => {
  if (localStorage.getItem(PREFERS_DARK_MODE_KEY) === null) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return localStorage.getItem(PREFERS_DARK_MODE_KEY) === "true";
};

const initState: SettingsReduxState = {
  locale: localStorage.getItem(SITE_LOCALE_KEY) || "en-US",
  prefersDarkMode: initializePrefersDarkMode(),
};

const settingsReducers: Reducer<SettingsReduxState, SettingsReduxAction> = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_WEBSITE_LOCALE:
      return { ...state, locale: action.payload.locale };
    case CHANGE_PREFERS_DARK_MODE:
      return { ...state, prefersDarkMode: action.payload.prefersDarkMode };
    default:
      return state;
  }
};

export default settingsReducers;
