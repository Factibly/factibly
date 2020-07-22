import { SHOW_TICKET_SUBMISSION_SUCCESS, SHOW_TICKET_SUBMISSION_FAIL } from "./action-types";

interface TicketSubmitStatus {
  msg?: string;
  backgroundColor?: string;
}

export interface SupportReduxState {
  ticketSubmitStatus: TicketSubmitStatus;
}

const initState: SupportReduxState = {
  ticketSubmitStatus: { msg: "", backgroundColor: "inherit" },
};

const supportReducers = (state = initState, action: any) => {
  switch (action.type) {
    case SHOW_TICKET_SUBMISSION_SUCCESS:
    case SHOW_TICKET_SUBMISSION_FAIL:
      return {
        ...state,
        ticketSubmitStatus: { msg: action.payload.msg, backgroundColor: action.payload.backgroundColor },
      };
    default:
      return state;
  }
};

export default supportReducers;
