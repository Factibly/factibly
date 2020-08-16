import React from "react";
import { connect } from "react-redux";
import { changeDarkMode } from "../../../store/settings/actions";
import { RootState } from "../../../store/rootReducer";
import { useIntl } from "react-intl";
import DropdownMenuItem from "../../../common/DropdownMenuItem";
import AnonymousActionMenu from "./AnonymousActionMenu";
import ProfileActionMenu from "./ProfileActionMenu";
import { Divider, Switch } from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HelpIcon from "@material-ui/icons/Help";
import { useAlert } from "../../../hooks/useAlert";
import { SUPPORT_PATH } from "../../../static/paths";
import { logoutUser } from "../../../hooks/state";

interface AccountNavigationMenuProps {
  onSwitchMenu: (nextMenu: any) => void;
  onMenuBack: () => void;
  userLoggedIn: boolean;
  prefersDarkMode: boolean;
  changeDarkMode: (prefersDarkMode: boolean) => object;
}

const AccountNavigationMenu = ({
  onSwitchMenu,
  userLoggedIn,
  prefersDarkMode,
  changeDarkMode,
}: AccountNavigationMenuProps) => {
  const intl = useIntl();

  const [, setAlert] = useAlert();

  const handleDarkModeSwitch = () => changeDarkMode(!prefersDarkMode);

  const handleLogout = async () => {
    await logoutUser();

    setAlert({
      severity: "success",
      message: intl.formatMessage({ id: "user.alert.msg.logoutSuccess" }),
    });
  };

  return (
    <>
      {userLoggedIn ? <ProfileActionMenu /> : <AnonymousActionMenu />}
      <Divider />
      <DropdownMenuItem primary={intl.formatMessage({ id: "nav.dropdown.item.darkMode" })} icon={<Brightness4Icon />}>
        <Switch
          name="dark-mode-switch"
          checked={prefersDarkMode}
          onChange={handleDarkModeSwitch}
          inputProps={{
            role: "switch",
            "aria-label": intl.formatMessage({ id: "nav.dropdown.item.darkMode" }),
          }}
        />
      </DropdownMenuItem>
      <DropdownMenuItem
        primary={intl.formatMessage({ id: "nav.dropdown.item.language" })}
        icon={<LanguageIcon />}
        onClick={() => onSwitchMenu("language")}
      >
        <ChevronRightIcon />
      </DropdownMenuItem>
      <DropdownMenuItem
        component="a"
        button
        primary={intl.formatMessage({ id: "nav.drawer.item.supportFeedback" })}
        icon={<HelpIcon />}
        href={SUPPORT_PATH}
      />
      {userLoggedIn && (
        <>
          <Divider />
          <DropdownMenuItem
            primary={intl.formatMessage({ id: "nav.dropdown.item.logOut" })}
            icon={<ExitToAppIcon />}
            onClick={handleLogout}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: RootState) => ({ prefersDarkMode: state.settingsReducer.prefersDarkMode });
const mapDispatchToProps = (dispatch: any) => ({
  changeDarkMode: (prefersDarkMode: boolean) => dispatch(changeDarkMode(prefersDarkMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountNavigationMenu);
