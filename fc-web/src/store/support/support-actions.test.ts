import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as supportActions from "./support-actions";
import { SHOW_TICKET_SUBMISSION_SUCCESS, SHOW_TICKET_SUBMISSION_FAIL } from "./action-types";

const mockStore = configureMockStore([thunk]);
let store: any;

const supportTextName = "support";

describe("Support Actions", () => {
  beforeEach(() => {
    store = mockStore({});
  });

  it("showTicketSubmissionSuccess", () => {
    expect(supportActions.showTicketSubmissionSuccess).toBeDefined();
  });

  it("dispatch showTicketSubmissionSuccess", () => {
    const expectedActions = [
      {
        type: SHOW_TICKET_SUBMISSION_SUCCESS,
        payload: {
          msg: "support.form.banner.success.content",
          backgroundColor: "green",
        },
      },
    ];
    store.dispatch(supportActions.showTicketSubmissionSuccess());
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("showTicketSubmissionFail", () => {
    expect(supportActions.showTicketSubmissionFail).toBeDefined();
  });

  it("dispatch showTicketSubmissionFail", () => {
    const expectedActions = [
      {
        type: SHOW_TICKET_SUBMISSION_FAIL,
        payload: {
          msg: "support.form.banner.fail.content",
          backgroundColor: "red",
        },
      },
    ];
    store.dispatch(supportActions.showTicketSubmissionFail());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
