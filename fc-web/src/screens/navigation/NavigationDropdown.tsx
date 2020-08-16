import React, { useState } from "react";
import StyledMenu from "../../common/StyledMenu";
import AccountNavigationMenu from "./dropdown/AccountNavigationMenu";
import LanguageMenu from "./dropdown/LanguageMenu";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, IconButton, Avatar, Typography } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { useQuery } from "@apollo/client";
import { CURRENT_USER, USER_LOGGED_IN } from "../../gql/queries";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fullProfileButton: {
      // padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
      borderRadius: theme.spacing(3),
      textTransform: "none",
      textDecoration: "none",
      color: theme.palette.common.white,
      display: "none",
      "&:hover": {
        backgroundColor: grey[700],
      },
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    iconicProfileButton: {
      color: theme.palette.common.white,
      display: "none",
      "&:hover": {
        backgroundColor: grey[700],
      },
      [theme.breakpoints.down("sm")]: {
        display: "flex",
      },
    },
    profileName: {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    menu: {
      "& > *": {
        minWidth: 256,
      },
    },
  })
);

const NavigationDropdown = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [menu, setMenu] = useState("default");

  const { data: userData } = useQuery(CURRENT_USER);
  const displayName = userData?.currentUser?.displayName;

  const { data } = useQuery(USER_LOGGED_IN);
  const userLoggedIn = data?.userLoggedIn;

  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const switchMenu = (menu: string) => {
    setMenu(menu);
  };

  const handleMenuBack = () => switchMenu("default");

  const handleMenuBackAndQuit = () => {
    handleMenuBack();
    closeMenu();
  };

  return (
    <>
      <Button
        className={classes.fullProfileButton}
        startIcon={<Avatar style={{ width: 32, height: 32 }} />}
        onClick={openMenu}
        aria-controls="account-nav-menu"
        aria-haspopup="true"
      >
        {userLoggedIn && <Typography className={classes.profileName}> {displayName} </Typography>}
      </Button>
      <IconButton
        className={classes.iconicProfileButton}
        onClick={openMenu}
        aria-controls="account-nav-menu"
        aria-haspopup="true"
      >
        <Avatar style={{ width: 32, height: 32 }} />
      </IconButton>
      <StyledMenu className={classes.menu} open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={closeMenu}>
        {
          {
            default: (
              <AccountNavigationMenu
                userLoggedIn={userLoggedIn}
                onSwitchMenu={switchMenu}
                onMenuBack={handleMenuBack}
              />
            ),
            language: <LanguageMenu onMenuBack={handleMenuBack} onMenuDone={handleMenuBackAndQuit} />,
          }[menu]
        }
      </StyledMenu>
    </>
  );
};

export default NavigationDropdown;
