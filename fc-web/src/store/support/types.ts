export const SET_SUPPORT_TAB = "setSupportTab";
export const SHOW_TICKET_SUBMISSION_SUCCESS = "showTicketSubmissionSuccess";
export const SHOW_TICKET_SUBMISSION_FAIL = "showTicketSubmissionFail";

export type SupportReduxState = {
  tabIndex: number;
  ticketSubmitStatus: {
    submitted: boolean;
    success: boolean;
    ticketId: string | null;
    messageId: string;
  };
};

export type SupportReduxAction =
  | { type: typeof SET_SUPPORT_TAB; payload: { tabIndex: number } }
  | {
      type: typeof SHOW_TICKET_SUBMISSION_SUCCESS | typeof SHOW_TICKET_SUBMISSION_FAIL;
      payload: { success: boolean; ticketId: string | null };
    };
