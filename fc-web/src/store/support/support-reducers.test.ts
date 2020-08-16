import supportReducers, { SupportReduxState } from "./support-reducers";
import { SHOW_TICKET_SUBMISSION_SUCCESS, SHOW_TICKET_SUBMISSION_FAIL } from "./action-types";

describe("Support Reducers", () => {
  it("show status of successfully submitted ticket", () => {
    const testAction = { type: SHOW_TICKET_SUBMISSION_SUCCESS, payload: { msg: "testing", backgroundColor: "green" } };
    const expectedState: SupportReduxState = {
      ticketSubmitStatus: {
        msg: "testing",
        backgroundColor: "green",
      },
    };
    expect(supportReducers(undefined, testAction)).toEqual(expectedState);
  });

  it("show status of unsuccessfully submitted ticket", () => {
    const testAction = { type: SHOW_TICKET_SUBMISSION_FAIL, payload: { msg: "testing", backgroundColor: "green" } };
    const expectedState: SupportReduxState = {
      ticketSubmitStatus: {
        msg: "testing",
        backgroundColor: "green",
      },
    };
    expect(supportReducers(undefined, testAction)).toEqual(expectedState);
  });
});
