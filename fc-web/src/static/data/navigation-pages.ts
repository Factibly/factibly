import InfoIcon from "@material-ui/icons/Info";
import AssessmentIcon from "@material-ui/icons/Assessment";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import CountrySelector from "../../screens/countries/CountrySelector";
import NotificationsBell from "../../screens/notifications/NotificationBell";
import { MISSION_PATH, BOOKMARKS_PATH } from "../paths";

interface NavPage {
  nameId: string;
  pathname?: string;
  Icon: React.ReactNode;
  showIconOnly: boolean;
  ariaLabelId?: string;
}

interface NavPages {
  insightsPage: NavPage;
  bookmarksPage: NavPage;
  aboutPage: NavPage;
  countriesSelector: NavPage;
  notificationsSelector: NavPage;
}

const navPages: NavPages = {
  insightsPage: {
    nameId: "nav.drawer.item.insights",
    pathname: "/insights",
    Icon: AssessmentIcon,
    showIconOnly: false,
  },
  aboutPage: {
    nameId: "nav.drawer.item.mission",
    pathname: MISSION_PATH,
    Icon: InfoIcon,
    showIconOnly: false,
  },
  bookmarksPage: {
    nameId: "nav.drawer.item.bookmark",
    pathname: BOOKMARKS_PATH,
    Icon: BookmarkIcon,
    showIconOnly: false,
  },
  countriesSelector: {
    nameId: "nav.selector.item.country",
    Icon: CountrySelector,
    showIconOnly: true,
    ariaLabelId: "nav.selector.item.country.aria",
  },
  notificationsSelector: {
    nameId: "nav.selector.item.notifications",
    Icon: NotificationsBell,
    showIconOnly: true,
    ariaLabelId: "nav.selector.item.notifications.aria",
  },
};

export default navPages;
