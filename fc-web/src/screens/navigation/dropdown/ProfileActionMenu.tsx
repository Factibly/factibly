import React from "react";
import { FormattedMessage } from "react-intl";
import DropdownMenuItem from "../../../common/DropdownMenuItem";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
// import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
// import NewReleasesIcon from "@material-ui/icons/NewReleases";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const ProfileActionMenu = () => {
  return (
    <>
      <DropdownMenuItem
        primary={<FormattedMessage id="nav.dropdown.profile.name" />}
        icon={<AccountBoxIcon />}
        onClick={() => {}}
      />
      {/* <DropdownMenuItem
        primary={<FormattedMessage id="nav.dropdown.achievements.name" />}
        icon={<EmojiEventsIcon />}
        onClick={() => {}}
      /> */}
      {/* <DropdownMenuItem
        primary={<FormattedMessage id="nav.dropdown.updates.name" />}
        icon={<NewReleasesIcon />}
        onClick={() => {}}
      >
        <ChevronRightIcon />
      </DropdownMenuItem> */}
    </>
  );
};

export default ProfileActionMenu;
