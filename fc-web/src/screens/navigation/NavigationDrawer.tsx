import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useIntl } from "react-intl";
import NavigationTitle from "./NavigationTitle";
import NotificationsBell from "../notifications/NotificationBell";
import CountrySelector from "../countries/CountrySelector";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
  Fade,
} from "@material-ui/core";
import { NAVIGATION_BLACK } from "../../styles/colours";
import navPages from "../../static/data/navigation-pages";

interface NavigationDrawerProps {
  drawerOpened: boolean;
  onDrawerOpened: (open: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    presentation: {
      [theme.breakpoints.down("xs")]: {
        width: 200,
      },
      [theme.breakpoints.up("sm")]: {
        width: 256,
      },
    },
    title: {
      padding: theme.spacing(2),
      backgroundColor: NAVIGATION_BLACK,
      color: theme.palette.primary.contrastText,
    },
    topConfigurationBar: {
      "& > *": {
        height: 48,
      },
    },
    topConfigurationBarRoot: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  })
);

const configItems = Object.freeze([
  {
    Icon: CountrySelector,
    nameId: navPages.countriesSelector.nameId,
    ariaLabelId: navPages.notificationsSelector.ariaLabelId,
  },
  {
    Icon: NotificationsBell,
    nameId: navPages.notificationsSelector.nameId,
    ariaLabelId: navPages.notificationsSelector.ariaLabelId,
  },
]);

const TopConfigurationBar = () => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <ListItem
      className={classes.topConfigurationBar}
      classes={{ root: classes.topConfigurationBarRoot }}
      disableGutters
      style={{ display: "flex" }}
    >
      {configItems.map(({ Icon, nameId, ariaLabelId }) => (
        <ListItemIcon
          key={`nav-config-bar-${nameId}-selector`}
          style={{ flex: "50%", justifyContent: "center", alignItems: "center" }}
        >
          <Tooltip title={intl.formatMessage({ id: nameId })} TransitionComponent={Fade}>
            <IconButton
              style={{ width: "100%", height: "100%", borderRadius: 0 }}
              aria-label={intl.formatMessage({ id: ariaLabelId })}
            >
              <Icon />
            </IconButton>
          </Tooltip>
        </ListItemIcon>
      ))}
    </ListItem>
  );
};

const DrawerMenuList = () => {
  const intl = useIntl();
  return (
    <>
      {Object.values(navPages).map(({ nameId, pathname, Icon: PageIcon, showIconOnly }) => {
        if (showIconOnly) {
          return null;
        }
        return (
          <ListItem key={`nav-item-${nameId}`} component={RouterLink} button to={pathname}>
            <ListItemIcon>
              <PageIcon />
            </ListItemIcon>
            <ListItemText primary={intl.formatMessage({ id: nameId })} />
          </ListItem>
        );
      })}
    </>
  );
};

const NavigationDrawer = (props: NavigationDrawerProps) => {
  const classes = useStyles();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    props.onDrawerOpened(open);
  };

  return (
    <Drawer anchor="left" open={props.drawerOpened} onClose={toggleDrawer(false)}>
      <div
        role="presentation"
        className={classes.presentation}
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <NavigationTitle className={classes.title} showAlways />
        <Divider />
        <nav>
          <List disablePadding>
            <TopConfigurationBar />
            <Divider />
            <DrawerMenuList />
            <Divider />
          </List>
        </nav>
      </div>
    </Drawer>
  );
};

export default NavigationDrawer;
