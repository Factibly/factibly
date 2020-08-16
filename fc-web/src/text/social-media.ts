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
  urlParamName: string;
  otherParams?: string[];
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

const socialMedia = (isBrowser: boolean = false, title?: string, body?: string): SocialMedia => ({
  email: {
    nameId: "general.social.email.title.name",
    nameDefault: "Email",
    icon: faEnvelope,
    starter: "mailto:",
    urlParamName: "body",
    otherParams: [`subject=${title}`],
  },
  facebook: {
    nameId: "general.social.facebook.title.name",
    nameDefault: "Facebook",
    icon: faFacebook,
    starter: "https://facebook.com/sharer/sharer.php",
    urlParamName: "u",
  },
  line: {
    nameId: "general.social.line.title.name",
    nameDefault: "LINE",
    icon: faLine,
    starter: "https://social-plugins.line.me/lineit/share",
    urlParamName: "url",
    otherParams: [`text=${title}`],
  },
  linkedin: {
    nameId: "general.social.linkedin.title.name",
    nameDefault: "LinkedIn",
    icon: faLinkedin,
    starter: "https://linkedin.com/shareArticle",
    urlParamName: "url",
    otherParams: ["mini=true", `title=${title}`, `source=${window.location.href}`],
  },
  pocket: {
    nameId: "general.social.pocket.title.name",
    nameDefault: "Pocket",
    icon: faGetPocket,
    starter: "https://getpocket.com/save",
    urlParamName: "url",
    otherParams: [`title=${title}`],
  },
  reddit: {
    nameId: "general.social.reddit.title.name",
    nameDefault: "Reddit",
    icon: faReddit,
    starter: "https://reddit.com/submit",
    urlParamName: "url",
    otherParams: [`title=${title}`],
  },
  telegram: {
    nameId: "general.social.telegram.title.name",
    nameDefault: "Telegram",
    icon: faTelegram,
    starter: "https://telegram.me/share/",
    urlParamName: "url",
    otherParams: [`text=${body}`],
  },
  tumblr: {
    nameId: "general.social.tumblr.title.name",
    nameDefault: "Tumblr",
    icon: faTumblr,
    starter: "https://www.tumblr.com/widgets/share/tool",
    urlParamName: "canonicalUrl",
    otherParams: [`title=${title}`, "posttype=link"],
  },
  twitter: {
    nameId: "general.social.twitter.title.name",
    nameDefault: "Twitter",
    icon: faTwitter,
    starter: "https://twitter.com/intent/tweet",
    urlParamName: "url",
    otherParams: [`text=${body}`],
  },
  viber: {
    nameId: "general.social.viber.title.name",
    nameDefault: "Viber",
    icon: faViber,
    starter: "viber://forward",
    urlParamName: "url",
    otherParams: [`text=${body} ${window.location.href}`],
  },
  vk: {
    nameId: "general.social.vk.title.name",
    nameDefault: "VK",
    icon: faVk,
    starter: "https://vk.com/share.php",
    urlParamName: "url",
    otherParams: [`title=${title}`, "no_parse=0", "no_vk_links=1"],
  },
  weibo: {
    nameId: "general.social.weibo.title.name",
    nameDefault: "Weibo",
    icon: faWeibo,
    starter: "http://service.weibo.com/share/share.php",
    urlParamName: "url",
    otherParams: [`title=${title}`],
  },
  whatsapp: {
    nameId: "general.social.whatsapp.title.name",
    nameDefault: "WhatsApp",
    icon: faWhatsapp,
    starter: `https://${isBrowser ? "web" : "api"}.whatsapp.com/send`,
    urlParamName: "url",
    otherParams: [`text=${body} ${window.location.href}`],
  },
});

export default socialMedia;
