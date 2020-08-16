import React, { PureComponent } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import DropdownMenuItem from "../../../common/DropdownMenuItem";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
// import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
// import NewReleasesIcon from "@material-ui/icons/NewReleases";
// import ChevronRightIcon from "@material-ui/icons/ChevronRight";

interface AnonymousActionMenuProps extends WrappedComponentProps<"intl"> {}

class ProfileActionMenu extends PureComponent<AnonymousActionMenuProps> {
  render() {
    return (
      <>
        <DropdownMenuItem
          primary={this.props.intl.formatMessage({ id: "nav.dropdown.item.profile" })}
          icon={<AccountBoxIcon />}
          onClick={() => {}}
        />
        {/* <DropdownMenuItem
        primary={<FormattedMessage id="nav.dropdown.item.achievements" />}
        icon={<EmojiEventsIcon />}
        onClick={() => {}}
      /> */}
        {/* <DropdownMenuItem
        primary={<FormattedMessage id="nav.dropdown.item.updates" />}
        icon={<NewReleasesIcon />}
        onClick={() => {}}
      >
        <ChevronRightIcon />
      </DropdownMenuItem> */}
      </>
    );
  }
}

export default injectIntl(ProfileActionMenu);
