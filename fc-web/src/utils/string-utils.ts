import * as countryList from "country-list";

if (!(Intl as any).DisplayNames) {
  require("@formatjs/intl-displaynames/polyfill");
  require("@formatjs/intl-displaynames/locale-data/en");
  require("@formatjs/intl-displaynames/locale-data/fr");
  require("@formatjs/intl-displaynames/locale-data/zh-Hans");
  require("@formatjs/intl-displaynames/locale-data/zh-Hant");
  require("@formatjs/intl-displaynames/locale-data/ja");
}

export const parseAsSpaced = function parseAsSpaced(
  str: string,
  delimiter: string = "-",
  capitalize: boolean = false,
  parseWordLimit: number = -1
) {
  const parsedBreakdown: string[] = str.toLowerCase().split(delimiter);
  const reducer = (acculumator: string, currentValue: string) => {
    const next = capitalize ? currentValue.charAt(0).toUpperCase() + currentValue.slice(1) : currentValue;
    return `${acculumator} ${next}`;
  };
  // Array.prototype.slice() handles any indices that are out of bounds within the array and
  //  can accept -ve numbers, in which case the method would traverse the array from the right
  // String.prototype.trim() ensures that the parsed string is space delimited at the start and end
  const delimited = parsedBreakdown.reduce(reducer).slice(0, parseWordLimit).trim();
  return delimited;
};

export const getSortedCountries = function getSortedCountries(formatDisplayName: (code: string) => string) {
  const codeMap = {};
  const names = countryList
    .getCodes()
    .map(code => {
      const displayName = formatDisplayName(code);
      codeMap[displayName] = code;
      return displayName;
    })
    .sort();
  return { names, codeMap };
};

export const parseGqlErrorMsg = function parseGqlErrorMsg(errorMsg: string) {
  const res = errorMsg.match(/^.*#@([.|\d|\w]+)@$/i);
  if (res === null || res === undefined || res.length <= 1) {
    return "app.alert.error.fallback";
  }
  return res[1];
};

export const hasSimiliarPathnames = function (pathname1: string, pathname2: string) {
  return !/^.*\/:.*$/i.test(pathname1) && (pathname2.includes(pathname1) || pathname1.includes(pathname2));
};

export const findClosestPathname = function findClosestPathname(
  pathnames: Record<string, string>,
  onFoundClosestPathname: (res: string | null) => any
) {
  let res: string | null = null;
  for (const pathname of Object.values(pathnames)) {
    if (pathname !== "/" && hasSimiliarPathnames(pathname, window.location.pathname)) {
      res = pathname;
      break;
    }
  }
  onFoundClosestPathname(res);
};
