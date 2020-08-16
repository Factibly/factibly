import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import navPages from "../../text/navigation-pages";
import NavigationLogo from "./NavigationLogo";
import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

interface NavigationDrawerProps {
  drawerOpened: boolean;
  onDrawerOpened: (open: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 256,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  })
);

const NavigationDrawer = (props: NavigationDrawerProps) => {
  const classes = useStyles();
  const intl = useIntl();

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
      <div role="presentation" className={classes.list} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
        <List>
          <NavigationLogo showAlways isClickable style={{ padding: 12 }}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open navigation drawer"
              onClick={toggleDrawer(!props.drawerOpened)}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </NavigationLogo>
          <Divider />
          {Object.values(navPages).map(({ name, path, Icon: PageIcon }, index) => {
            const text = name && intl.formatMessage({ id: name });
            return (
              <ListItem button key={`nav-item-${name}`} component="a" href={path?.trim()}>
                <ListItemIcon>
                  <PageIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
          <Divider />
        </List>
        <List style={{ position: "absolute", bottom: 0 }}>
          <ListItem>
            <ListItemText
              primary={`
                ${process.env.NODE_ENV?.slice(0, 3)}
                v${process.env.REACT_APP_VERSION}
              `}
            />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default NavigationDrawer;
