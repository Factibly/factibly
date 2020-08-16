import enLocale from "date-fns/locale/en-CA";
import frLocale from "date-fns/locale/fr";
import zhCnLocale from "date-fns/locale/zh-CN";
import zhTwLocale from "date-fns/locale/zh-TW";
import jaLocale from "date-fns/locale/ja";
import { enUS, frFR, zhCN, zhTW, jaJP } from "./mui-base";

/**
 * @property bcp: IETF BCP 47 language tag
 * @property mui: MUI locale tag
 * @property date: date-fns locale tag
 * @property dir: writing direction (ltr = left-to-right, rtl = right-to-left)
 */
export default {
  "en-US": {
    bcp: "en-US",
    mui: enUS,
    date: enLocale,
    dir: "ltr",
  },
  "fr-FR": {
    bcp: "fr-FR",
    mui: frFR,
    date: frLocale,
    dir: "ltr",
  },
  "zh-CN": {
    bcp: "zh-CN",
    mui: zhCN,
    date: zhCnLocale,
    dir: "ltr",
  },
  "zh-TW": {
    bcp: "zh-TW",
    mui: zhTW,
    date: zhTwLocale,
    dir: "ltr",
  },
  "ja-JP": {
    bcp: "ja-JP",
    mui: jaJP,
    date: jaLocale,
    dir: "ltr",
  },
};
