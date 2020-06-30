import React, { useState, cloneElement } from "react";
import { useIntl } from "react-intl";
import { isBrowser } from "react-device-detect";
import { fade, makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Toolbar, AppBar, InputBase, IconButton, Slide, useScrollTrigger } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import UserMenu from "./UserMenu";
import { useQuery } from "@apollo/react-hooks";
import { USER_LOGGED_IN } from "../../gql/queries";
import NavigationDrawer from "./NavigationDrawer";
import NavigationLogo from "./NavigationLogo";
import AnonymousMenu from "./AnonymousMenu";
import "../../styles/universal.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    search: {
      position: "relative",
      flexGrow: 1,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1.5, 1, 1.5, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width")
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex"
      }
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none"
      }
    },
    offset: theme.mixins.toolbar
  })
);

interface ElevationScrollProps {
  children: React.ReactElement;
}

const ElevationScroll = ({ children }: ElevationScrollProps) => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  return cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
};

interface HideOnScrollProps {
  children: React.ReactElement;
}

const HideOnScroll = ({ children }: HideOnScrollProps) => {
  const trigger = useScrollTrigger({ threshold: 16 });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

/**
 * @description hacky
 * @returns <codz> true </codz> if the current page being displayed is the "About FakeCheck" page
 */
function isAbout() {
  return /.*\/about-?/.test(window.location.pathname);
}

const NavigationBar = () => {
  const classes = useStyles();
  const intl = useIntl();
  const { data } = useQuery(USER_LOGGED_IN);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const onDrawerOpened = (open: boolean = !drawerOpened) => {
    setDrawerOpened(open);
  };

  const ScrollBehaviour = isBrowser || isAbout() ? ElevationScroll : HideOnScroll;

  return (
    <div role="banner">
      <ScrollBehaviour>
        <AppBar position={isAbout() ? "static" : "fixed"}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={() => onDrawerOpened()}
            >
              <MenuIcon />
            </IconButton>
            <NavigationLogo />
            {window.location.pathname === "/" ? (
              <div className={classes.grow} />
            ) : (
              <div role="search" className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  fullWidth
                  role="searchbox"
                  placeholder={intl.formatMessage({ id: "search" })}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            )}
            {data?.userLoggedIn ? <UserMenu /> : <AnonymousMenu />}
          </Toolbar>
        </AppBar>
      </ScrollBehaviour>
      {isAbout() || <div className={classes.offset} />}
      <NavigationDrawer drawerOpened={drawerOpened} onDrawerOpened={onDrawerOpened} />
    </div>
  );
};

export default NavigationBar;
