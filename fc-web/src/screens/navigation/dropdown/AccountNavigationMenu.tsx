import React, { PureComponent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { changeDarkMode } from "../../../store/settings/actions";
import { RootState } from "../../../store/rootReducer";
import { injectIntl, WrappedComponentProps } from "react-intl";
import DropdownMenuItem from "../../../common/DropdownMenuItem";
import AnonymousActionMenu from "./AnonymousActionMenu";
import ProfileActionMenu from "./ProfileActionMenu";
import { withStyles, WithStyles as WithStylesProps, createStyles } from "@material-ui/core/styles";
import { Divider, Switch } from "@material-ui/core";
import LanguageIcon from "@material-ui/icons/Language";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HelpIcon from "@material-ui/icons/Help";
import { SUPPORT_PATH } from "../../../static/paths";
import clsx from "clsx";

interface AccountNavigationMenuProps extends WrappedComponentProps<"intl">, WithStylesProps<typeof styles> {
  onSwitchMenu: (nextMenu: any) => void;
  handleLogout: () => void;
  onMenuBack: () => void;
  userLoggedIn: boolean;
  prefersDarkMode: boolean;
  changeDarkMode: (prefersDarkMode: boolean) => object;
}

const styles = createStyles({
  neon: {
    "@media (prefers-reduced-motion: no-preference)": {
      textShadow: "0 0 2px, 0 0 1em #4444FF, 0 0 0.5em #4444FF, 0 0 0.1em #4444FF, 0 8px 4px #000",
      "& > span": {
        animation: "blink linear infinite 3s",
      },
      "& > span:first-of-type": {
        animation: "blink linear infinite 5s",
      },
      "& > span:nth-of-type(3n+1)": {
        animation: "blink linear infinite 4s",
      },
      "& > span:nth-last-of-type(even)": {
        animation: "blink linear infinite 6s",
      },
    },
  },
});
class AccountNavigationMenu extends PureComponent<AccountNavigationMenuProps> {
  handleDarkModeSwitch = () => this.props.changeDarkMode(!this.props.prefersDarkMode);

  render() {
    const { onSwitchMenu, handleLogout, userLoggedIn, prefersDarkMode, classes, intl } = this.props;
    return (
      <>
        {userLoggedIn ? <ProfileActionMenu /> : <AnonymousActionMenu />}
        <Divider />
        <DropdownMenuItem
          primary={
            <div className={clsx(prefersDarkMode && classes.neon)}>
              {[...intl.formatMessage({ id: "nav.dropdown.item.darkMode" })].map((c, i) => (
                <span key={`neon-char-${i}`}>{c}</span>
              ))}
            </div>
          }
          icon={<Brightness4Icon />}
        >
          <Switch
            name="dark-mode-switch"
            checked={prefersDarkMode}
            onChange={this.handleDarkModeSwitch}
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
          component={RouterLink}
          button
          primary={intl.formatMessage({ id: "nav.drawer.item.supportFeedback" })}
          icon={<HelpIcon />}
          to={SUPPORT_PATH}
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
  }
}

const mapStateToProps = (state: RootState) => ({ prefersDarkMode: state.settingsReducer.prefersDarkMode });
const mapDispatchToProps = (dispatch: any) => ({
  changeDarkMode: (prefersDarkMode: boolean) => dispatch(changeDarkMode(prefersDarkMode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withStyles(styles)(AccountNavigationMenu)));
