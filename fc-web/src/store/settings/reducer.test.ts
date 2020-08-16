import settingsReducer from "./reducer";
import { SettingsReduxState, CHANGE_WEBSITE_LANGUAGE, CHANGE_DARK_MODE } from "./types";

describe("Support Reducers", () => {
  it("change website language", () => {
    const testAction = { type: CHANGE_WEBSITE_LANGUAGE, payload: { locale: "zh-Hant", prefersDarkMode: true } };
    const expectedState: SettingsReduxState = {
      locale: "zh-Hant",
      prefersDarkMode: false,
    };
    expect(settingsReducer(undefined, testAction)).toEqual(expectedState);
  });

  it("change dark mode preference", () => {
    const testAction = { type: CHANGE_DARK_MODE, payload: { locale: "zh-Hant", prefersDarkMode: true } };
    const expectedState: SettingsReduxState = {
      locale: "en-US",
      prefersDarkMode: true,
    };
    expect(settingsReducer(undefined, testAction)).toEqual(expectedState);
  });
});
