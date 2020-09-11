import InfoIcon from "@material-ui/icons/Info";
import AssessmentIcon from "@material-ui/icons/Assessment";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import CountrySelector from "../../screens/countries/CountrySelector";
// import NotificationsBell from "../../screens/notifications/NotificationBell";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import { MISSION_PATH, BOOKMARKS_PATH, SUPPORT_PATH } from "../paths";

interface Page {
  nameId: string;
  pathname?: string;
  Icon: React.ElementType;
  showIconOnly: boolean;
  ariaLabelId?: string;
}

const pages: Page[] = [
  {
    nameId: "nav.drawer.item.insights",
    Icon: AssessmentIcon,
    showIconOnly: false,
    pathname: "/insights",
  },
  {
    nameId: "nav.drawer.item.mission",
    Icon: InfoIcon,
    showIconOnly: false,
    pathname: MISSION_PATH,
  },
  {
    nameId: "nav.drawer.item.bookmark",
    Icon: BookmarkIcon,
    showIconOnly: false,
    pathname: BOOKMARKS_PATH,
  },
  {
    nameId: "nav.selector.item.country",
    Icon: CountrySelector,
    showIconOnly: true,
    ariaLabelId: "nav.selector.item.country.aria",
  },
  {
    nameId: "nav.dropdown.item.support",
    Icon: QuestionAnswerIcon,
    showIconOnly: true,
    pathname: SUPPORT_PATH,
    ariaLabelId: "nav.dropdown.item.support.aria",
  },
  // {
  //   nameId: "nav.selector.item.notifications",
  //   Icon: NotificationsBell,
  //   showIconOnly: true,
  //   ariaLabelId: "nav.selector.item.notifications.aria",
  // },
];

export default pages;
