import appMessages from "./app-messages";
import factCheckMessages from "./fact-check-messages";
import generalMessages from "./general-messages";
import homeMessages from "./home-messages";
import missionMessages from "./mission-messages";
import navMessages from "./nav-messages";
import supportMessages from "./support-messages";
import userMessages from "./user-messages";

export default {
  en: {
    ...appMessages["en"],
    ...factCheckMessages["en"],
    ...generalMessages["en"],
    ...homeMessages["en"],
    ...missionMessages["en"],
    ...navMessages["en"],
    ...supportMessages["en"],
    ...userMessages["en"],
  },
  fr: {
    ...appMessages["fr"],
    ...factCheckMessages["fr"],
    ...generalMessages["fr"],
    ...homeMessages["fr"],
    ...missionMessages["fr"],
    ...navMessages["fr"],
    ...supportMessages["fr"],
    ...userMessages["fr"],
  },
  "zh-CN": {
    ...appMessages["zh-CN"],
    ...factCheckMessages["zh-CN"],
    ...generalMessages["zh-CN"],
    ...homeMessages["zh-CN"],
    ...missionMessages["zh-CN"],
    ...navMessages["zh-CN"],
    ...supportMessages["zh-CN"],
    ...userMessages["zh-CN"],
  },
  "zh-TW": {
    ...appMessages["zh-TW"],
    ...factCheckMessages["zh-TW"],
    ...generalMessages["zh-TW"],
    ...homeMessages["zh-TW"],
    ...missionMessages["zh-TW"],
    ...navMessages["zh-TW"],
    ...supportMessages["zh-TW"],
    ...userMessages["zh-TW"],
  },
  ja: {
    ...appMessages["ja"],
    ...factCheckMessages["ja"],
    ...generalMessages["ja"],
    ...homeMessages["ja"],
    ...missionMessages["ja"],
    ...navMessages["ja"],
    ...supportMessages["ja"],
    ...userMessages["ja"],
  },
};
