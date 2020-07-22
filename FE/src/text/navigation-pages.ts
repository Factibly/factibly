import InfoIcon from "@material-ui/icons/Info";
import AssessmentIcon from "@material-ui/icons/Assessment";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import CountrySelectionDropdown from "../screens/countries/CountrySelectionDropdown";
import NotificationsBell from "../screens/notifications/NotificationBell";

interface NavPage {
  name: string;
  path?: string;
  Icon: React.ReactNode;
  showIconOnly?: boolean;
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
    name: "nav.drawer.insights.name",
    path: "/insights",
    Icon: AssessmentIcon,
    showIconOnly: false,
  },
  aboutPage: {
    name: "nav.drawer.aboutUs.name",
    path: "/mission",
    Icon: InfoIcon,
    showIconOnly: false,
  },
  bookmarksPage: {
    name: "nav.drawer.bookmark.name",
    path: "/bookmarks",
    Icon: BookmarkIcon,
    showIconOnly: false,
  },
  countriesSelector: {
    name: "Country",
    Icon: CountrySelectionDropdown,
    showIconOnly: true,
  },
  notificationsSelector: {
    name: "Notifications",
    Icon: NotificationsBell,
    showIconOnly: true,
  },
};

export default navPages;
