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
  icon: IconDefinition;
  starter: string;
  urlSearchParamKey: string;
  otherSearchParams?: string[];
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
    nameId: "general.social.email",
    icon: faEnvelope,
    starter: "mailto:",
    urlSearchParamKey: "body",
    otherSearchParams: [`subject=${title}`],
  },
  facebook: {
    nameId: "general.social.facebook",
    icon: faFacebook,
    starter: "https://facebook.com/sharer/sharer.php",
    urlSearchParamKey: "u",
  },
  line: {
    nameId: "general.social.line",
    icon: faLine,
    starter: "https://social-plugins.line.me/lineit/share",
    urlSearchParamKey: "url",
    otherSearchParams: [`text=${title}`],
  },
  linkedin: {
    nameId: "general.social.linkedin",
    icon: faLinkedin,
    starter: "https://linkedin.com/shareArticle",
    urlSearchParamKey: "url",
    otherSearchParams: ["mini=true", `title=${title}`, `source=${url}`],
  },
  pocket: {
    nameId: "general.social.pocket",
    icon: faGetPocket,
    starter: "https://getpocket.com/save",
    urlSearchParamKey: "url",
    otherSearchParams: [`title=${title}`],
  },
  reddit: {
    nameId: "general.social.reddit",
    icon: faReddit,
    starter: "https://reddit.com/submit",
    urlSearchParamKey: "url",
    otherSearchParams: [`title=${title}`],
  },
  telegram: {
    nameId: "general.social.telegram",
    icon: faTelegram,
    starter: "https://telegram.me/share/",
    urlSearchParamKey: "url",
    otherSearchParams: [`text=${body}`],
  },
  tumblr: {
    nameId: "general.social.tumblr",
    icon: faTumblr,
    starter: "https://www.tumblr.com/widgets/share/tool",
    urlSearchParamKey: "canonicalUrl",
    otherSearchParams: [`title=${title}`, "posttype=link"],
  },
  twitter: {
    nameId: "general.social.twitter",
    icon: faTwitter,
    starter: "https://twitter.com/intent/tweet",
    urlSearchParamKey: "url",
    otherSearchParams: [`text=${body}`],
  },
  viber: {
    nameId: "general.social.viber",
    icon: faViber,
    starter: "viber://forward",
    urlSearchParamKey: "url",
    otherSearchParams: [`text=${body} ${url}`],
  },
  vk: {
    nameId: "general.social.vk",
    icon: faVk,
    starter: "https://vk.com/share.php",
    urlSearchParamKey: "url",
    otherSearchParams: [`title=${title}`, "no_parse=0", "no_vk_links=1"],
  },
  weibo: {
    nameId: "general.social.weibo",
    icon: faWeibo,
    starter: "http://service.weibo.com/share/share.php",
    urlSearchParamKey: "url",
    otherSearchParams: [`title=${title}`],
  },
  whatsapp: {
    nameId: "general.social.whatsapp",
    icon: faWhatsapp,
    starter: `https://${isBrowser ? "web" : "api"}.whatsapp.com/send`,
    urlSearchParamKey: "url",
    otherSearchParams: [`text=${body} ${url}`],
  },
});

export default socialMedia;
