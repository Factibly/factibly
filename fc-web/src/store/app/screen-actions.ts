import { CHANGE_WEBSITE_LANGUAGE, CHANGE_DARK_MODE } from "./action-types";

export const changeWebsiteLanguage = (locale: string) => (dispatch: any) => {
  localStorage.setItem("site_locale", locale);
  dispatch({
    type: CHANGE_WEBSITE_LANGUAGE,
    payload: { locale },
  });
};

export const changeDarkMode = (prefersDarkMode: boolean) => (dispatch: any) => {
  localStorage.setItem("prefers_dark_mode", prefersDarkMode.toString());
  dispatch({
    type: CHANGE_DARK_MODE,
    payload: { prefersDarkMode },
  });
};
