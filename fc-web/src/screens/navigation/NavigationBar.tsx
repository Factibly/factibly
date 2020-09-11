import React, { useState, cloneElement } from "react";
import { withRouter, RouteComponentProps, Link as RouterLink } from "react-router-dom";
import { useIntl } from "react-intl";
import { isBrowser } from "react-device-detect";
import Flex from "../../common/Flex";
import SearchBar from "../../common/SearchBar";
import HeavyDivider from "../../common/HeavyDivider";
import NavigationDropdown from "./NavigationDropdown";
import NavigationDrawer from "./NavigationDrawer";
import NavigationLogo from "./NavigationLogo";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, createStyles, Theme, useTheme, fade } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { Toolbar, AppBar, Slide, Button, IconButton, Tooltip } from "@material-ui/core";
import { NAVIGATION_BLACK, NAVIGATION_HOVER_GREY } from "../../styles/colours";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { GraphQLError } from "graphql";
import { useMutation } from "@apollo/client";
import { SEARCH_CONTENT } from "../../gql/mutations";
import { useAlert } from "../../hooks/useAlert";
import history from "../../hooks/history";
import pages from "../../static/data/navigation-pages";
import { FACT_CHECK_BASE_PATH } from "../../static/paths";
import { parseGqlErrorMsg } from "../../utils/string-utils";
import { SearchContent, SearchContentVariables } from "../../gql/__generated__/SearchContent";

interface NavigationBarProps extends RouteComponentProps {}

const menuBreakpoint = "md";
const searchBreakpoint = "sm";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      backgroundColor: NAVIGATION_BLACK,
      color: theme.palette.common.white,
    },
    menuButton: {
      marginRight: 0,
      display: "inline-block",
      [theme.breakpoints.up(menuBreakpoint)]: {
        display: "none",
      },
      [theme.breakpoints.up(searchBreakpoint)]: {
        marginRight: theme.spacing(2),
      },
    },
    logo: {
      display: "none",
      [theme.breakpoints.up(searchBreakpoint)]: {
        display: "block",
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
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      [theme.breakpoints.up(searchBreakpoint)]: {
        marginRight: theme.spacing(2),
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
      // [theme.breakpoints.down("xs")]: {
      //   "&:focus": {
      //     width: "24ch",
      //   },
      // },
    },
    linksGroup: {
      display: "none",
      [theme.breakpoints.up(menuBreakpoint)]: {
        display: "flex",
      },
    },
    linkButton: {
      marginRight: theme.spacing(1),
      color: theme.palette.primary.contrastText,
      borderRadius: theme.spacing(3),
      textTransform: "none",
      textOverflow: "nowrap",
      whiteSpace: "nowrap",
      "&:hover": {
        backgroundColor: NAVIGATION_HOVER_GREY,
      },
    },
    divider: {
      display: "none",
      [theme.breakpoints.up(searchBreakpoint)]: {
        display: "initial",
      },
    },
    offset: theme.mixins.toolbar,
  })
);

interface ElevationScrollProps {
  children: React.ReactElement;
}

const ElevationScroll = ({ children }: ElevationScrollProps) => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });
  return cloneElement(children, { elevation: trigger ? 4 : 0 });
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

const ScrollBehaviour = isBrowser ? ElevationScroll : HideOnScroll;

const NavigationBar = ({ location }: NavigationBarProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const intl = useIntl();

  const [, setAlert] = useAlert();
  const smUpWidth = useMediaQuery(theme.breakpoints.up(searchBreakpoint));

  const [searchFactCheck] = useMutation<SearchContent, SearchContentVariables>(SEARCH_CONTENT);

  const [searchExpanded, setSearchExpanded] = useState<boolean>(false);
  const handleSearchExpand = () => !smUpWidth && setSearchExpanded(true);
  const handleNavigationBack = () => !smUpWidth && setSearchExpanded(false);

  const [drawerOpened, setDrawerOpened] = useState(false);
  const handleDrawerOpened = (open: boolean = !drawerOpened) => setDrawerOpened(open);

  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value);
  const handleSearchClear = () => setSearchQuery("");
  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await searchFactCheck({ variables: { input: { url: searchQuery } } });
      if (res.data?.searchContent?.errors) throw new GraphQLError(res.data?.searchContent?.errors);
      history.push(`${FACT_CHECK_BASE_PATH}/${res.data!.searchContent!.content!.id}`);
    } catch (err) {
      setAlert({
        severity: "error",
        message: intl.formatMessage({ id: parseGqlErrorMsg(err.toString()) }),
      });
    }
    setSearchQuery("");
  };

  return (
    <>
      <ScrollBehaviour>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.menuButton}
              edge="start"
              color="inherit"
              onClick={() => (searchExpanded ? handleNavigationBack() : handleDrawerOpened())}
              disableRipple={searchExpanded}
              aria-label={intl.formatMessage({ id: "nav.drawer.action.open.aria" })}
            >
              {searchExpanded ? <ArrowBack /> : <MenuIcon />}
            </IconButton>
            <NavigationLogo className={classes.logo} />
            {location.pathname === "/" ? (
              <Flex style={{ flex: 1 }} />
            ) : (
              <form role="search" className={classes.search} onSubmit={handleSearchSubmit}>
                <SearchBar
                  classes={{ root: classes.inputRoot }}
                  autoComplete="url"
                  value={searchQuery}
                  onChange={handleSearchInput}
                  onClear={handleSearchClear}
                  onFocus={handleSearchExpand}
                  onBlur={handleNavigationBack}
                  apv={2.2}
                  aph={3}
                />
              </form>
            )}
            <nav className={classes.linksGroup}>
              {pages.map(({ nameId, Icon, showIconOnly, pathname = "", ariaLabelId }) =>
                showIconOnly ? (
                  <Tooltip key={`nav-item-${nameId}`} title={intl.formatMessage({ id: nameId })}>
                    <IconButton
                      className={classes.linkButton}
                      component={pathname ? RouterLink : "button"}
                      to={pathname}
                      aria-label={intl.formatMessage({ id: ariaLabelId })}
                    >
                      <Icon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Button
                    key={`nav-item-${nameId}`}
                    className={classes.linkButton}
                    component={RouterLink}
                    to={pathname}
                  >
                    {intl.formatMessage({ id: nameId })}
                  </Button>
                )
              )}
            </nav>
            {!searchExpanded && (
              <>
                <HeavyDivider className={classes.divider} orientation="vertical" />
                <NavigationDropdown />
              </>
            )}
          </Toolbar>
        </AppBar>
      </ScrollBehaviour>
      <div className={classes.offset} />
      <NavigationDrawer drawerOpened={drawerOpened} onDrawerOpened={handleDrawerOpened} />
    </>
  );
};

export default withRouter(NavigationBar);
