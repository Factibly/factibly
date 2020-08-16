export const CHANGE_WEBSITE_LANGUAGE = "changeWebsiteLanguage";
export const CHANGE_DARK_MODE = "changeDarkMode";

export interface SettingsReduxState {
  locale: string;
  prefersDarkMode: boolean;
}
