import { CHANGE_WEBSITE_LANGUAGE } from "./actionTypes";

const initState = {
  lang: localStorage.getItem("site-lang") || "en"
};

const screenReducers = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_WEBSITE_LANGUAGE:
      return { ...state, lang: action.payload };
    default:
      return state;
  }
};

export default screenReducers;
