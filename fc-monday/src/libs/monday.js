import mondaySdk from "monday-sdk-js";

const monday = mondaySdk();
monday.setToken(process.env.REACT_APP_MONDAY_API_TOKEN);

export default monday;
