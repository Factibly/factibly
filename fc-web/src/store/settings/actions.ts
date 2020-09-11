import { CHANGE_WEBSITE_LOCALE, CHANGE_PREFERS_DARK_MODE } from "./types";
import { SITE_LOCALE_KEY, PREFERS_DARK_MODE_KEY } from "../../static/keys/local-storage-keys";

export const changeWebsiteLocale = (locale: string) => (dispatch: any) => {
  localStorage.setItem(SITE_LOCALE_KEY, locale);
  dispatch({
    type: CHANGE_WEBSITE_LOCALE,
    payload: { locale },
  });
};

export const changePrefersDarkMode = (prefersDarkMode: boolean) => (dispatch: any) => {
  localStorage.setItem(PREFERS_DARK_MODE_KEY, prefersDarkMode.toString());
  dispatch({
    type: CHANGE_PREFERS_DARK_MODE,
    payload: { prefersDarkMode },
  });
};
