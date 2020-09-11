import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useIntl } from "react-intl";
import NavigationLogo from "./NavigationLogo";
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
import { partition } from "lodash";
import pages from "../../static/data/navigation-pages";

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
    logo: {
      padding: theme.spacing(2),
      backgroundColor: NAVIGATION_BLACK,
      color: theme.palette.primary.contrastText,
    },
    topMenuItems: {
      display: "flex",
      "& > *": {
        height: 48,
      },
    },
    topMenuItemsRoot: {
      paddingTop: 0,
      paddingBottom: 0,
    },
    selector: {
      flex: "50%",
      justifyContent: "center",
      alignItems: "center",
    },
    iconButton: {
      width: "100%",
      height: "100%",
      borderRadius: 0,
    },
  })
);

const [topMenuItems, centreMenuItems] = partition(pages, o => o.showIconOnly);

const TopMenuItems = () => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <ListItem className={classes.topMenuItems} classes={{ root: classes.topMenuItemsRoot }} disableGutters>
      {topMenuItems.map(({ nameId, Icon, pathname, ariaLabelId }) => (
        <ListItemIcon key={`nav-drawer-${nameId}-selector`} className={classes.selector}>
          <Tooltip title={intl.formatMessage({ id: nameId })} TransitionComponent={Fade}>
            <IconButton
              className={classes.iconButton}
              component={pathname ? RouterLink : "button"}
              to={pathname}
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

const CentreMenuItems = () => {
  const intl = useIntl();
  return (
    <>
      {centreMenuItems.map(({ nameId, Icon, pathname = "" }) => (
        <ListItem key={`nav-item-${nameId}`} button component={RouterLink} to={pathname}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={intl.formatMessage({ id: nameId })} />
        </ListItem>
      ))}
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
        <NavigationLogo className={classes.logo} />
        <Divider />
        <nav>
          <List disablePadding>
            <TopMenuItems />
            <Divider />
            <CentreMenuItems />
            <Divider />
          </List>
        </nav>
      </div>
    </Drawer>
  );
};

export default NavigationDrawer;
