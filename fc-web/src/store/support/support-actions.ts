import { SHOW_TICKET_SUBMISSION_SUCCESS, SHOW_TICKET_SUBMISSION_FAIL } from "./action-types";

export const showTicketSubmissionSuccess = () => (dispatch: any) => {
  dispatch({
    type: SHOW_TICKET_SUBMISSION_SUCCESS,
    payload: {
      msg: "support.form.banner.success.content",
      backgroundColor: "green",
    },
  });
};

export const showTicketSubmissionFail = () => (dispatch: any) => {
  dispatch({
    type: SHOW_TICKET_SUBMISSION_FAIL,
    payload: {
      msg: "support.form.banner.fail.content",
      backgroundColor: "red",
    },
  });
};
