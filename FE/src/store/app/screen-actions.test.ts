import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as screenActions from "./screen-actions";
import { CHANGE_WEBSITE_LANGUAGE, CHANGE_DARK_MODE } from "./action-types";

const mockStore = configureMockStore([thunk]);
let store: any;

const locale = "en";

describe("Support Actions", () => {
  beforeEach(() => {
    store = mockStore({});
  });

  it("find change website language", () => {
    expect(screenActions.changeWebsiteLanguage).toBeDefined();
  });

  it("dispatch change website language", () => {
    const expectedActions = [
      {
        type: CHANGE_WEBSITE_LANGUAGE,
        payload: {
          locale,
        },
      },
    ];
    store.dispatch(screenActions.changeWebsiteLanguage(locale));
    expect(store.getActions()).toEqual(expectedActions);
    expect(localStorage.getItem("site_locale")).toEqual(locale);
  });

  it("find change dark mode", () => {
    expect(screenActions.changeDarkMode).toBeDefined();
  });

  it("dispatch change dark mode", () => {
    const expectedActions = [
      {
        type: CHANGE_DARK_MODE,
        payload: {
          prefersDarkMode: false,
        },
      },
    ];
    store.dispatch(screenActions.changeDarkMode(false));
    expect(store.getActions()).toEqual(expectedActions);
    expect(localStorage.getItem("prefers_dark_mode")).toEqual("false");
  });
});
