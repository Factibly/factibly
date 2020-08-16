import React, { useState } from "react";
import { useIntl } from "react-intl";
import StyledMenu from "../../common/StyledMenu";
import AccountNavigationMenu from "./dropdown/AccountNavigationMenu";
import LanguageMenu from "./dropdown/LanguageMenu";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, IconButton, Avatar, Typography } from "@material-ui/core";
import { NAVIGATION_HOVER_GREY } from "../../styles/colours";
import { CURRENT_USER } from "../../gql/queries";
import { CurrentUser } from "../../gql/__generated__/CurrentUser";
import { useCustomQuery } from "../../hooks/gql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullProfileButton: {
      borderRadius: theme.spacing(3),
      textTransform: "none",
      textDecoration: "none",
      color: theme.palette.common.white,
      display: "none",
      "&:hover": {
        backgroundColor: NAVIGATION_HOVER_GREY,
      },
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    iconicProfileButton: {
      color: theme.palette.common.white,
      display: "none",
      "&:hover": {
        backgroundColor: NAVIGATION_HOVER_GREY,
      },
      [theme.breakpoints.down("sm")]: {
        display: "flex",
      },
    },
    menuPaper: {
      minWidth: 256,
    },
    scaledAvatar: {
      width: 32,
      height: 32,
    },
    profileName: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  })
);

const NavigationDropdown = () => {
  const classes = useStyles();
  const intl = useIntl();

  const { data: userData } = useCustomQuery<CurrentUser>(CURRENT_USER);
  const userLoggedIn = !!userData?.currentUser;
  const displayName = userData?.currentUser?.displayName;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleOpenMenu = (event: any) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const [selectedNameMenu, setSelectedMenuName] = useState<string>("default");
  const handleSwitchMenu = (newMenuName: string) => setSelectedMenuName(newMenuName);
  const handleMenuBack = () => handleSwitchMenu("default");
  const handleMenuBackAndQuit = () => {
    handleMenuBack();
    handleCloseMenu();
  };

  const ScaledAvatar = (
    <Avatar
      key={userData?.currentUser?.avatar ?? undefined}
      className={classes.scaledAvatar}
      src={
        userLoggedIn && userData?.currentUser?.avatar
          ? `${process.env.REACT_APP_CLOUDFRONT_URL}/${userData?.currentUser?.avatar}`
          : ""
      }
      alt={displayName}
      aria-label={intl.formatMessage({ id: "user.avatar.self.aria" }, { displayName })}
    />
  );

  return (
    <nav>
      <Button
        key={`profile-button-${displayName}-full`}
        className={classes.fullProfileButton}
        startIcon={ScaledAvatar}
        onClick={handleOpenMenu}
        aria-haspopup="true"
      >
        {userLoggedIn && <Typography className={classes.profileName}> {displayName} </Typography>}
      </Button>
      <IconButton
        key={`profile-button-${displayName}-iconic`}
        className={classes.iconicProfileButton}
        onClick={handleOpenMenu}
        aria-haspopup="true"
      >
        {ScaledAvatar}
      </IconButton>
      <StyledMenu
        id="primary-nav-menu"
        classes={{ paper: classes.menuPaper }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        aria-label={intl.formatMessage({ id: "nav.dropdown.action.open.aria" })}
      >
        {
          {
            default: (
              <AccountNavigationMenu
                userLoggedIn={userLoggedIn}
                onSwitchMenu={handleSwitchMenu}
                onMenuBack={handleMenuBack}
              />
            ),
            language: <LanguageMenu onMenuBack={handleMenuBack} onMenuDone={handleMenuBackAndQuit} />,
          }[selectedNameMenu]
        }
      </StyledMenu>
    </nav>
  );
};

export default NavigationDropdown;
