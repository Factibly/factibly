import React, { useState, cloneElement } from "react";
import { withRouter } from "react-router-dom";
import { useIntl } from "react-intl";
import { isBrowser } from "react-device-detect";
import Flex from "../../common/Flex";
import SearchBar from "../../common/SearchBar";
import navPages from "../../text/navigation-pages";
import HeavyDivider from "../../common/HeavyDivider";
import NavigationDropdown from "./NavigationDropdown";
import NavigationDrawer from "./NavigationDrawer";
import NavigationLogo from "./NavigationLogo";
import { fade, makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Toolbar, AppBar, Slide, Button, IconButton } from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { grey } from "@material-ui/core/colors";
import MenuIcon from "@material-ui/icons/Menu";
import { useMutation } from "@apollo/client";
import { SEARCH } from "../../gql/mutations";
import { retrieveSearchMutationOptions } from "../Home";

const useStyles = makeStyles((theme: Theme) => {
  const menuBreakpoint = "md";
  return createStyles({
    toolbar: {
      backgroundColor: grey[900],
      color: theme.palette.common.white,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      display: "inline-block",
      [theme.breakpoints.up(menuBreakpoint)]: {
        display: "none",
      },
    },
    search: {
      position: "relative",
      flexGrow: 1,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // transition: theme.transitions.create("width"),
      // width: "100%",
      // [theme.breakpoints.up("md")]: {
      //   width: "20ch",
      // },
    },
    linksgroup: {
      display: "none",
      [theme.breakpoints.up(menuBreakpoint)]: {
        display: "flex",
      },
      "& > *": {
        marginRight: theme.spacing(1),
      },
    },
    linkButton: {
      borderRadius: theme.spacing(3),
      textTransform: "none",
      textOverflow: "nowrap",
      whiteSpace: "nowrap",
      "&:hover": {
        backgroundColor: grey[700],
      },
    },
    offset: theme.mixins.toolbar,
  });
});

interface ElevationScrollProps {
  children: React.ReactElement;
}

const ElevationScroll = ({ children }: ElevationScrollProps) => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
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
 * @returns <code> true </code> if the current page being displayed is the "About FakeCheck" page
 */
function isMissionPage() {
  return /.*\/mission-?/.test(window.location.pathname);
}

const NavigationBar = ({ location, history }) => {
  const classes = useStyles();
  const intl = useIntl();
  const [searchQuery, setSearchQuery] = useState("");
  const [drawerOpened, setDrawerOpened] = useState(false);

  const [searchMutation] = useMutation(SEARCH, retrieveSearchMutationOptions(searchQuery));

  const onDrawerOpened = (open: boolean = !drawerOpened) => {
    setDrawerOpened(open);
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setSearchQuery(target.value);
  };

  const handleSearchClear = () => {
    setSearchQuery("");
  };

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchMutation();
    setSearchQuery("");
  };

  const ScrollBehaviour = isBrowser || isMissionPage() ? ElevationScroll : HideOnScroll;

  return (
    <div role="banner">
      <ScrollBehaviour>
        <AppBar position={isMissionPage() ? "static" : "fixed"}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.menuButton}
              edge="start"
              color="inherit"
              onClick={() => onDrawerOpened()}
              aria-label="open navigation drawer"
            >
              <MenuIcon />
            </IconButton>
            <NavigationLogo isClickable />
            {location.pathname === "/" ? (
              <Flex style={{ flex: 1 }} />
            ) : (
              <form role="search" className={classes.search} onSubmit={submitSearch}>
                <SearchBar
                  value={searchQuery}
                  onChange={handleSearchInput}
                  onSubmit={submitSearch}
                  onClear={handleSearchClear}
                  useContrastingColor
                  hideSearchButtonOnTiny
                  extensionClasses={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </form>
            )}
            <div className={classes.linksgroup}>
              {Object.values(navPages).map(({ name, path, Icon: PageIcon, showIconOnly }) => {
                const LinkButton = showIconOnly ? IconButton : (Button as any);
                const text = name && intl.formatMessage({ id: name });
                return (
                  <LinkButton
                    key={`nav-item-${name}`}
                    className={classes.linkButton}
                    href={path?.trim()}
                    color="inherit"
                  >
                    {showIconOnly ? <PageIcon /> : text}
                  </LinkButton>
                );
              })}
            </div>
            <HeavyDivider orientation="vertical" />
            <NavigationDropdown />
          </Toolbar>
        </AppBar>
      </ScrollBehaviour>
      {isMissionPage() || <div className={classes.offset} />}
      <NavigationDrawer drawerOpened={drawerOpened} onDrawerOpened={onDrawerOpened} />
    </div>
  );
};

export default withRouter(NavigationBar);
