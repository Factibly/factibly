import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

interface NavigationLogoProps {
  className?: string;
  showAlways?: boolean;
  isClickable?: boolean;
  style?: object;
  children?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: ({ showAlways = false, style }: NavigationLogoProps) => ({
    display: showAlways ? "block" : "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    ...style, // TS automatically ignores the spread operator on nullish values
  }),
}));

const NavigationLogo = (props: NavigationLogoProps) => {
  const classes = useStyles(props);
  return (
    <Typography className={clsx(classes.title, props.className)} variant="h6" noWrap>
      {props.children}
      {props.isClickable ? (
        <Link to="/" style={{ color: "inherit", textDecoration: "inherit", textAlign: "right" }}>
          FakeCheck
        </Link>
      ) : (
        <> FakeCheck </>
      )}
    </Typography>
  );
};

export default NavigationLogo;
