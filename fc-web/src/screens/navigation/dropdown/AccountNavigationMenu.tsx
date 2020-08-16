import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { changeDarkMode } from "../../../store/app/screen-actions";
import DropdownMenuItem from "../../../common/DropdownMenuItem";
import AnonymousActionMenu from "./AnonymousActionMenu";
import ProfileActionMenu from "./ProfileActionMenu";
import { Divider, Switch } from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HelpIcon from "@material-ui/icons/Help";
import { logoutUser } from "../../../utils/user-utils";
import history from "../../../hooks/history";

interface AccountNavigationMenuProps {
  prefersDarkMode: boolean;
  changeDarkMode: (prefersDarkMode: boolean) => object;
  onSwitchMenu: (nextMenu: any) => void;
  onMenuBack: () => void;
  userLoggedIn: boolean;
}

const AccountNavigationMenu = ({
  onSwitchMenu,
  changeDarkMode,
  prefersDarkMode,
  userLoggedIn,
}: AccountNavigationMenuProps) => {
  const handleDarkModeSwitch = () => {
    changeDarkMode(!prefersDarkMode);
  };

  return (
    <>
      {userLoggedIn ? <ProfileActionMenu /> : <AnonymousActionMenu />}
      <Divider />
      <DropdownMenuItem primary={<FormattedMessage id="nav.dropdown.darkMode.name" />} icon={<Brightness4Icon />}>
        <Switch name="dark-mode-switch" checked={prefersDarkMode} onChange={handleDarkModeSwitch} />
      </DropdownMenuItem>
      <DropdownMenuItem
        primary={<FormattedMessage id="nav.dropdown.language.name" />}
        icon={<LanguageIcon />}
        onClick={() => onSwitchMenu("language")}
      >
        <ChevronRightIcon />
      </DropdownMenuItem>
      <DropdownMenuItem
        primary={<FormattedMessage id="nav.drawer.supportFeedback.name" />}
        icon={<HelpIcon />}
        onClick={() => history.push("/support")}
      />
      {userLoggedIn && (
        <>
          <Divider />
          <DropdownMenuItem
            primary={<FormattedMessage id="nav.dropdown.logOut.name" />}
            icon={<ExitToAppIcon />}
            onClick={() => logoutUser()}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => ({ prefersDarkMode: state.screenReducers.prefersDarkMode });
const mapDispatchToProps = (dispatch: any) => ({
  changeDarkMode: (prefersDarkMode: boolean) => dispatch(changeDarkMode(prefersDarkMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountNavigationMenu);
