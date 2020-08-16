import { SettingsReduxState, CHANGE_WEBSITE_LANGUAGE, CHANGE_DARK_MODE } from "./types";
import { SITE_LOCALE_KEY, PREFERS_DARK_MODE_KEY } from "../../static/keys/local-storage-keys";

const initState: SettingsReduxState = {
  locale: localStorage.getItem(SITE_LOCALE_KEY) || "en-US",
  prefersDarkMode: localStorage.getItem(PREFERS_DARK_MODE_KEY) === "true",
};

const settingsReducers = (state = initState, action: any): SettingsReduxState => {
  switch (action.type) {
    case CHANGE_WEBSITE_LANGUAGE:
      return { ...state, locale: action.payload.locale };
    case CHANGE_DARK_MODE:
      return { ...state, prefersDarkMode: action.payload.prefersDarkMode };
    default:
      return state;
  }
};

export default settingsReducers;
