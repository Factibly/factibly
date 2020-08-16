import supportReducers from "./reducer";
import { SupportReduxState, SHOW_TICKET_SUBMISSION_SUCCESS, SHOW_TICKET_SUBMISSION_FAIL } from "./types";

describe("Support Reducers", () => {
  it("show status of successfully submitted ticket", () => {
    const testAction = {
      type: SHOW_TICKET_SUBMISSION_SUCCESS,
      payload: {
        msgId: "support.banner.msg.success",
        backgroundColor: "green",
      },
    };
    const expectedState: SupportReduxState = {
      tabIndex: 0,
      ticketSubmitStatus: {
        submitted: true,
        messageId: "support.banner.msg.success",
        backgroundColor: "green",
      },
    };
    expect(supportReducers(undefined, testAction)).toEqual(expectedState);
  });

  it("show status of unsuccessfully submitted ticket", () => {
    const testAction = {
      type: SHOW_TICKET_SUBMISSION_FAIL,
      payload: {
        messageId: "support.banner.msg.fail",
        backgroundColor: "red",
      },
    };
    const expectedState: SupportReduxState = {
      tabIndex: 0,
      ticketSubmitStatus: {
        submitted: true,
        messageId: "support.banner.msg.fail",
        backgroundColor: "red",
      },
    };
    expect(supportReducers(undefined, testAction)).toEqual(expectedState);
  });
});
