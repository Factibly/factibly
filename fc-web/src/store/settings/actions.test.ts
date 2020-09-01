import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as screenActions from "./actions";
import { CHANGE_WEBSITE_LOCALE, CHANGE_PREFERS_DARK_MODE } from "./types";
import { SITE_LOCALE_KEY, PREFERS_DARK_MODE_KEY } from "../../static/keys/local-storage-keys";

const mockStore = configureMockStore([thunk]);
let store: any;

const locale = "en-US";

describe("Settings Actions", () => {
  beforeEach(() => {
    store = mockStore({});
  });

  it("find change website language", () => {
    expect(screenActions.changeWebsiteLanguage).toBeDefined();
  });

  it("dispatch change website language", () => {
    const expectedActions = [
      {
        type: CHANGE_WEBSITE_LOCALE,
        payload: {
          locale,
        },
      },
    ];
    store.dispatch(screenActions.changeWebsiteLanguage(locale));
    expect(store.getActions()).toEqual(expectedActions);
    expect(localStorage.getItem(SITE_LOCALE_KEY)).toEqual(locale);
  });

  it("find change dark mode", () => {
    expect(screenActions.changeDarkMode).toBeDefined();
  });

  it("dispatch change dark mode", () => {
    const expectedActions = [
      {
        type: CHANGE_PREFERS_DARK_MODE,
        payload: {
          prefersDarkMode: false,
        },
      },
    ];
    store.dispatch(screenActions.changeDarkMode(false));
    expect(store.getActions()).toEqual(expectedActions);
    expect(localStorage.getItem(PREFERS_DARK_MODE_KEY)).toEqual("false");
  });
});
