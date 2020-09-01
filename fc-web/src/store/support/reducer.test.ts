import supportReducers from "./reducer";
import { SupportReduxState, SHOW_TICKET_SUBMISSION_SUCCESS, SHOW_TICKET_SUBMISSION_FAIL } from "./types";

describe("Support Reducers", () => {
  it("show status of successfully submitted ticket", () => {
    const testAction = {
      type: SHOW_TICKET_SUBMISSION_SUCCESS as typeof SHOW_TICKET_SUBMISSION_SUCCESS,
      payload: {
        ticketId: "30197",
        success: true,
      },
    };
    const expectedState: SupportReduxState = {
      tabIndex: 0,
      ticketSubmitStatus: {
        ticketId: "30197",
        success: true,
        submitted: true,
        messageId: "support.banner.msg.success",
      },
    };
    expect(supportReducers(undefined, testAction)).toEqual(expectedState);
  });

  it("show status of unsuccessfully submitted ticket", () => {
    const testAction = {
      type: SHOW_TICKET_SUBMISSION_FAIL as typeof SHOW_TICKET_SUBMISSION_FAIL,
      payload: {
        ticketId: null,
        success: false,
      },
    };
    const expectedState: SupportReduxState = {
      tabIndex: 0,
      ticketSubmitStatus: {
        ticketId: null,
        submitted: true,
        success: false,
        messageId: "support.banner.msg.fail",
      },
    };
    expect(supportReducers(undefined, testAction)).toEqual(expectedState);
  });
});
