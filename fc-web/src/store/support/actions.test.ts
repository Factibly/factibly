import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as supportActions from "./actions";
import { SHOW_TICKET_SUBMISSION_SUCCESS, SHOW_TICKET_SUBMISSION_FAIL } from "./types";

const mockStore = configureMockStore([thunk]);
let store: any;

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
          msgId: "support.banner.msg.success",
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
          msgId: "support.banner.msg.fail",
          backgroundColor: "red",
        },
      },
    ];
    store.dispatch(supportActions.showTicketSubmissionFail());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
