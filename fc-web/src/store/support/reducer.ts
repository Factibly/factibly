import { Reducer } from "redux";
import {
  SupportReduxState,
  SupportReduxAction,
  SET_SUPPORT_TAB,
  SHOW_TICKET_SUBMISSION_SUCCESS,
  SHOW_TICKET_SUBMISSION_FAIL,
} from "./types";
import { SUPPORT_TAB_INDEX_KEY } from "../../static/keys/session-storage-keys";

const initState: SupportReduxState = {
  tabIndex: parseInt(sessionStorage.getItem(SUPPORT_TAB_INDEX_KEY) ?? "0"),
  ticketSubmitStatus: {
    submitted: false,
    success: false,
    ticketId: null,
    messageId: "",
  },
};

const supportReducers: Reducer<SupportReduxState, SupportReduxAction> = (state = initState, action) => {
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
          success: action.payload.success,
          ticketId: action.payload.ticketId,
          messageId: action.payload.success
            ? "support.banner.msg.submission.success"
            : "support.banner.msg.submission.error",
        },
      };
    default:
      return state;
  }
};

export default supportReducers;
