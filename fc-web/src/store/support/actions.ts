import { SET_SUPPORT_TAB, SHOW_TICKET_SUBMISSION_SUCCESS, SHOW_TICKET_SUBMISSION_FAIL } from "./types";
import { SUPPORT_TAB_INDEX_KEY } from "../../static/keys/session-storage-keys";

function retrieveTicketPayload(success: boolean, backgroundColor: string, dispatch: any) {
  return dispatch({
    type: success ? SHOW_TICKET_SUBMISSION_SUCCESS : SHOW_TICKET_SUBMISSION_FAIL,
    payload: {
      messageId: `support.form.banner.${success ? "success" : "fail"}`,
      backgroundColor,
    },
  });
}

export const setSupportTab = (tabIndex: number) => (dispatch: any) => {
  sessionStorage.setItem(SUPPORT_TAB_INDEX_KEY, tabIndex.toString());
  dispatch({
    type: SET_SUPPORT_TAB,
    payload: { tabIndex },
  });
};

export const showTicketSubmissionSuccess = () => (dispatch: any) => {
  retrieveTicketPayload(true, "green", dispatch);
};

export const showTicketSubmissionFail = () => (dispatch: any) => {
  retrieveTicketPayload(false, "red", dispatch);
};
