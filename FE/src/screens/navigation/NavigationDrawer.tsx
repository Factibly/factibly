import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import navPages, { NavPage } from "../../text/nav-pages";
import NavigationLogo from "./NavigationLogo";

interface NavigationDrawerProps {
  drawerOpened: boolean;
  onDrawerOpened: (open: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250
    },
    menuButton: {
      marginRight: theme.spacing(2)
    }
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
              aria-label="open drawer"
              onClick={toggleDrawer(!props.drawerOpened)}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </NavigationLogo>
          <Divider />
          {navPages.map((navPage: NavPage, index: number) => {
            const [id, path, PageIcon] = navPage;
            const text = intl.formatMessage({ id: id as string });
            return (
              <React.Fragment key={`${text}-item`}>
                <ListItem button component="a" href={(path as string).trim()}>
                  <ListItemIcon>
                    <PageIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
                {index === 3 && <Divider />}
              </React.Fragment>
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
