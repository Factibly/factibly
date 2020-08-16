import { faEnvelope, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faLine,
  faLinkedin,
  faGetPocket,
  faReddit,
  faTelegram,
  faTumblr,
  faTwitter,
  faViber,
  faVk,
  faWhatsapp,
  faWeibo,
} from "@fortawesome/free-brands-svg-icons";

interface SocialMedium {
  nameId: string;
  nameDefault: string;
  icon: IconDefinition;
  starter: string;
  urlQueryParamKey: string;
  otherQueryParams?: string[];
}

interface SocialMedia {
  email: SocialMedium;
  facebook: SocialMedium;
  line: SocialMedium;
  linkedin: SocialMedium;
  pocket: SocialMedium;
  reddit: SocialMedium;
  telegram: SocialMedium;
  tumblr: SocialMedium;
  twitter: SocialMedium;
  viber: SocialMedium;
  vk: SocialMedium;
  weibo: SocialMedium;
  whatsapp: SocialMedium;
}

const socialMedia = (
  isBrowser: boolean = false,
  url: string = "",
  title: string = "",
  body: string = ""
): SocialMedia => ({
  email: {
    nameId: "general.social.email.title",
    nameDefault: "Email",
    icon: faEnvelope,
    starter: "mailto:",
    urlQueryParamKey: "body",
    otherQueryParams: [`subject=${title}`],
  },
  facebook: {
    nameId: "general.social.facebook.title",
    nameDefault: "Facebook",
    icon: faFacebook,
    starter: "https://facebook.com/sharer/sharer.php",
    urlQueryParamKey: "u",
  },
  line: {
    nameId: "general.social.line.title",
    nameDefault: "LINE",
    icon: faLine,
    starter: "https://social-plugins.line.me/lineit/share",
    urlQueryParamKey: "url",
    otherQueryParams: [`text=${title}`],
  },
  linkedin: {
    nameId: "general.social.linkedin.title",
    nameDefault: "LinkedIn",
    icon: faLinkedin,
    starter: "https://linkedin.com/shareArticle",
    urlQueryParamKey: "url",
    otherQueryParams: ["mini=true", `title=${title}`, `source=${url}`],
  },
  pocket: {
    nameId: "general.social.pocket.title",
    nameDefault: "Pocket",
    icon: faGetPocket,
    starter: "https://getpocket.com/save",
    urlQueryParamKey: "url",
    otherQueryParams: [`title=${title}`],
  },
  reddit: {
    nameId: "general.social.reddit.title",
    nameDefault: "Reddit",
    icon: faReddit,
    starter: "https://reddit.com/submit",
    urlQueryParamKey: "url",
    otherQueryParams: [`title=${title}`],
  },
  telegram: {
    nameId: "general.social.telegram.title",
    nameDefault: "Telegram",
    icon: faTelegram,
    starter: "https://telegram.me/share/",
    urlQueryParamKey: "url",
    otherQueryParams: [`text=${body}`],
  },
  tumblr: {
    nameId: "general.social.tumblr.title",
    nameDefault: "Tumblr",
    icon: faTumblr,
    starter: "https://www.tumblr.com/widgets/share/tool",
    urlQueryParamKey: "canonicalUrl",
    otherQueryParams: [`title=${title}`, "posttype=link"],
  },
  twitter: {
    nameId: "general.social.twitter.title",
    nameDefault: "Twitter",
    icon: faTwitter,
    starter: "https://twitter.com/intent/tweet",
    urlQueryParamKey: "url",
    otherQueryParams: [`text=${body}`],
  },
  viber: {
    nameId: "general.social.viber.title",
    nameDefault: "Viber",
    icon: faViber,
    starter: "viber://forward",
    urlQueryParamKey: "url",
    otherQueryParams: [`text=${body} ${url}`],
  },
  vk: {
    nameId: "general.social.vk.title",
    nameDefault: "VK",
    icon: faVk,
    starter: "https://vk.com/share.php",
    urlQueryParamKey: "url",
    otherQueryParams: [`title=${title}`, "no_parse=0", "no_vk_links=1"],
  },
  weibo: {
    nameId: "general.social.weibo.title",
    nameDefault: "Weibo",
    icon: faWeibo,
    starter: "http://service.weibo.com/share/share.php",
    urlQueryParamKey: "url",
    otherQueryParams: [`title=${title}`],
  },
  whatsapp: {
    nameId: "general.social.whatsapp.title",
    nameDefault: "WhatsApp",
    icon: faWhatsapp,
    starter: `https://${isBrowser ? "web" : "api"}.whatsapp.com/send`,
    urlQueryParamKey: "url",
    otherQueryParams: [`text=${body} ${url}`],
  },
});

export default socialMedia;
