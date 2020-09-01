import settingsReducer from "./reducer";
import { SettingsReduxState, CHANGE_WEBSITE_LOCALE, CHANGE_PREFERS_DARK_MODE } from "./types";

describe("Settings Reducers", () => {
  it("change website language", () => {
    const testAction = { type: CHANGE_WEBSITE_LOCALE as typeof CHANGE_WEBSITE_LOCALE, payload: { locale: "zh-CN" } };
    const expectedState: SettingsReduxState = {
      locale: "zh-CN",
      prefersDarkMode: false,
    };
    expect(settingsReducer(undefined, testAction)).toEqual(expectedState);
  });

  it("change dark mode preference", () => {
    const testAction = {
      type: CHANGE_PREFERS_DARK_MODE as typeof CHANGE_PREFERS_DARK_MODE,
      payload: { locale: "zh-CN", prefersDarkMode: true },
    };
    const expectedState: SettingsReduxState = {
      locale: "en-US",
      prefersDarkMode: true,
    };
    expect(settingsReducer(undefined, testAction)).toEqual(expectedState);
  });
});
