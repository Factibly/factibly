import Rollbar from "rollbar";

const rollbar = new Rollbar({
  accessToken: process.env.REACT_APP_ROLLBAR_CLIENT_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  scrubTelemetryInputs: true,
  payload: {
    environment: process.env.NODE_ENV,
  },
  enabled: (process.env.NODE_ENV || "").trim() === "production",
});

export default rollbar;
