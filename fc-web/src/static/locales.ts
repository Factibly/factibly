import enUsLocale from "date-fns/locale/en-US";
import enGbLocale from "date-fns/locale/en-GB";
import frLocale from "date-fns/locale/fr";
import zhCnLocale from "date-fns/locale/zh-CN";
import zhTwLocale from "date-fns/locale/zh-TW";
import jaLocale from "date-fns/locale/ja";
import { enUS, frFR, zhCN, zhTW, jaJP } from "./mui-base";

/**
 * @property display: the full name of the language in that respecitve language
 * @property bcp: IETF BCP 47 language tag
 * @property mui: MUI locale tag
 * @property date: date-fns locale tag
 * @property dir: writing direction (ltr = left-to-right, rtl = right-to-left)
 */
export default {
  "en-US": {
    display: "English (US)",
    bcp: "en-US",
    mui: enUS,
    date: enUsLocale,
    dir: "ltr",
  },
  "en-GB": {
    display: "English (UK)",
    bcp: "en-GB",
    mui: enUS,
    date: enGbLocale,
    dir: "ltr",
  },
  "fr-FR": {
    display: "Français",
    bcp: "fr-FR",
    mui: frFR,
    date: frLocale,
    dir: "ltr",
  },
  "zh-CN": {
    display: "中文（简体）",
    bcp: "zh-CN",
    mui: zhCN,
    date: zhCnLocale,
    dir: "ltr",
  },
  "zh-TW": {
    display: "中文（繁體）",
    bcp: "zh-TW",
    mui: zhTW,
    date: zhTwLocale,
    dir: "ltr",
  },
  "ja-JP": {
    display: "日本語",
    bcp: "ja-JP",
    mui: jaJP,
    date: jaLocale,
    dir: "ltr",
  },
};
