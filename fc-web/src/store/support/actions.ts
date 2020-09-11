import { SET_SUPPORT_TAB, SHOW_TICKET_SUBMISSION_SUCCESS, SHOW_TICKET_SUBMISSION_FAIL } from "./types";
import { SUPPORT_TAB_INDEX_KEY } from "../../static/keys/session-storage-keys";
import asanaClient from "../../libs/asana";
import { SupportFormValues } from "../../utils/forms/support-form-helper";

function retrieveTicketPayload(success: boolean, ticketId: string | null = null, dispatch: any) {
  return dispatch({
    type: success ? SHOW_TICKET_SUBMISSION_SUCCESS : SHOW_TICKET_SUBMISSION_FAIL,
    payload: {
      ticketId,
      success,
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

export const showTicketSubmissionSuccess = (ticketId: string) => (dispatch: any) => {
  window.scrollTo(0, 0);
  retrieveTicketPayload(true, ticketId, dispatch);
};

export const showTicketSubmissionFail = () => (dispatch: any) => {
  window.scrollTo(0, 0);
  retrieveTicketPayload(false, null, dispatch);
};

export const submitToAsana = (
  category: string,
  topic: string,
  values: SupportFormValues | undefined,
  support: boolean = true
) => (dispatch: any) => {
  if (
    process.env.REACT_APP_ASANA_ACCESS_TOKEN &&
    process.env.REACT_APP_ASANA_WORKSPACE_GID &&
    process.env.REACT_APP_ASANA_SUPPORT_PROJECT_GID &&
    process.env.REACT_APP_ASANA_FEEDBACK_PROJECT_GID &&
    values
  ) {
    // eslint-disable-next-line max-len
    const html_notes = `<body><strong>Topic</strong>: ${topic}\n<strong>Email</strong>: ${values.email}\n<strong>Date</strong>: ${values.occurrenceDate}\n\n${values.description}</body>`;

    const data = {
      completed: false,
      followers: process.env.REACT_APP_ASANA_USERS_GID?.split(" ") ?? [],
      name: `[${category.toUpperCase()}] ${values.title}`,
      projects: [
        support ? process.env.REACT_APP_ASANA_SUPPORT_PROJECT_GID : process.env.REACT_APP_ASANA_FEEDBACK_PROJECT_GID,
      ],
      html_notes,
      workspace: process.env.REACT_APP_ASANA_WORKSPACE_GID,
      options: {
        fields: ["followers", "html_notes"],
      },
    };

    asanaClient.tasks
      .create(data)
      .then(data => showTicketSubmissionSuccess(data.gid)(dispatch))
      .catch(() => showTicketSubmissionFail()(dispatch));
  } else {
    showTicketSubmissionFail()(dispatch);
  }
};
