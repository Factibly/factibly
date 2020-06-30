import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core/SvgIcon/SvgIcon";
import HomeIcon from "@material-ui/icons/Home";
import ScoreIcon from "@material-ui/icons/Score";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import SchoolIcon from "@material-ui/icons/School";
import DeveloperBoardIcon from "@material-ui/icons/DeveloperBoard";
import InfoIcon from "@material-ui/icons/Info";
import HelpIcon from "@material-ui/icons/Help";

export type NavPage = (string | OverridableComponent<SvgIconTypeMap<{}, "svg">>)[];

const navPages: NavPage[] = [
  ["home", "/", HomeIcon],
  ["factCheck", "/fact-check", ScoreIcon],
  ["viewHistory", "/bookmark", BookmarkIcon],
  ["realUpCorner", "/real-up", SchoolIcon],
  ["companyBlog", "/blog", DeveloperBoardIcon],
  ["aboutUs", "/about", InfoIcon],
  ["supportFeedback", "/support", HelpIcon]
];

export default navPages;
