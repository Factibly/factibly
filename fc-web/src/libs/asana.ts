import asana from "asana";

const client = asana.Client.create().useAccessToken(process.env.REACT_APP_ASANA_ACCESS_TOKEN ?? "");

export default client;
