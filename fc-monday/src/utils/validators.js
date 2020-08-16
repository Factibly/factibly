import urlRegex from "url-regex";

export const getUrlRegex = flag => new RegExp(urlRegex(), flag);

export const validUrl = url => getUrlRegex("i").test(url);
