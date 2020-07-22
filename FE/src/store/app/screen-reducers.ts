import { CHANGE_WEBSITE_LANGUAGE, CHANGE_DARK_MODE } from "./action-types";

export interface ScreenReduxState {
  locale: string;
  prefersDarkMode: boolean;
}

const initState: ScreenReduxState = {
  locale: localStorage.getItem("site_locale") || "en",
  prefersDarkMode: localStorage.getItem("prefers_dark_mode") === "true",
};

const screenReducers = (state = initState, action: any) => {
  switch (action.type) {
    case CHANGE_WEBSITE_LANGUAGE:
      return { ...state, locale: action.payload.locale };
    case CHANGE_DARK_MODE:
      return { ...state, prefersDarkMode: action.payload.prefersDarkMode };
    default:
      return state;
  }
};

export default screenReducers;
