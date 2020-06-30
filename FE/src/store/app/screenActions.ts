import { CHANGE_WEBSITE_LANGUAGE } from "./actionTypes";

export const changeWebsiteLanguage = (lang: string) => (dispatch: any) => {
  localStorage.setItem("site-lang", lang);
  dispatch({
    type: CHANGE_WEBSITE_LANGUAGE,
    payload: lang
  });
};
