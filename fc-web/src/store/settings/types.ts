export const CHANGE_WEBSITE_LOCALE = "changeWebsiteLocale";
export const CHANGE_PREFERS_DARK_MODE = "changePrefersDarkMode";

export type SettingsReduxState = {
  locale: string;
  prefersDarkMode: boolean;
};

export type SettingsReduxAction =
  | { type: typeof CHANGE_WEBSITE_LOCALE; payload: { locale: string } }
  | { type: typeof CHANGE_PREFERS_DARK_MODE; payload: { prefersDarkMode: boolean } };
