import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

interface NavigationTitleProps {
  className?: string;
  showAlways?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: ({ showAlways }: any) => ({
    display: showAlways ? "block" : "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  }),
}));

const NavigationTitle = ({ className, showAlways = false, style, children }: NavigationTitleProps) => {
  const classes = useStyles({ showAlways });
  return (
    <Typography className={clsx(classes.title, className)} component="h1" variant="h6" noWrap style={style}>
      {children}
      <Button component={RouterLink} to="/">
        <img src="/images/factibly-logo--full.png" alt="factibly logo" />
      </Button>
    </Typography>
  );
};

export default NavigationTitle;
