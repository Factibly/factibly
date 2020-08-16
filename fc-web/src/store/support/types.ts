export const SET_SUPPORT_TAB = "setSupportTab";
export const SHOW_TICKET_SUBMISSION_SUCCESS = "showTicketSubmissionSuccess";
export const SHOW_TICKET_SUBMISSION_FAIL = "showTicketSubmissionFail";

export interface SupportReduxState {
  tabIndex: number;
  ticketSubmitStatus: {
    submitted: boolean;
    messageId: string;
    backgroundColor: string;
  };
}
