import {
  SupportReduxState,
  SET_SUPPORT_TAB,
  SHOW_TICKET_SUBMISSION_SUCCESS,
  SHOW_TICKET_SUBMISSION_FAIL,
} from "./types";
import { SUPPORT_TAB_INDEX_KEY } from "../../static/keys/session-storage-keys";

const initState: SupportReduxState = {
  tabIndex: parseInt(sessionStorage.getItem(SUPPORT_TAB_INDEX_KEY) ?? "0"),
  ticketSubmitStatus: {
    submitted: false,
    messageId: "",
    backgroundColor: "inherit",
  },
};

const supportReducers = (state = initState, action: any): SupportReduxState => {
  switch (action.type) {
    case SET_SUPPORT_TAB:
      return {
        ...state,
        tabIndex: action.payload.tabIndex,
      };
    case SHOW_TICKET_SUBMISSION_SUCCESS:
    case SHOW_TICKET_SUBMISSION_FAIL:
      return {
        ...state,
        ticketSubmitStatus: {
          submitted: true,
          messageId: action.payload.messageId,
          backgroundColor: action.payload.backgroundColor,
        },
      };
    default:
      return state;
  }
};

export default supportReducers;
