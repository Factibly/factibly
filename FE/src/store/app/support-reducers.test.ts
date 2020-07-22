import supportReducers, { ScreenReduxState } from "./screen-reducers";
import { CHANGE_WEBSITE_LANGUAGE, CHANGE_DARK_MODE } from "./action-types";

describe("Support Reducers", () => {
  it("change website language", () => {
    const testAction = { type: CHANGE_WEBSITE_LANGUAGE, payload: { locale: "zh-Hant", prefersDarkMode: true } };
    const expectedState: ScreenReduxState = {
      locale: "zh-Hant",
      prefersDarkMode: false,
    };
    expect(supportReducers(undefined, testAction)).toEqual(expectedState);
  });

  it("change dark mode preference", () => {
    const testAction = { type: CHANGE_DARK_MODE, payload: { locale: "zh-Hant", prefersDarkMode: true } };
    const expectedState: ScreenReduxState = {
      locale: "en",
      prefersDarkMode: true,
    };
    expect(supportReducers(undefined, testAction)).toEqual(expectedState);
  });
});
