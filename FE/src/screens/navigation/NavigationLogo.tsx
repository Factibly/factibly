import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

interface NavLogoProps {
  showAlways?: boolean;
  isClickable?: boolean;
  style?: object;
  children?: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: ({ showAlways = false, style }: NavLogoProps) => ({
    display: showAlways ? "block" : "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    },
    ...style // TS automatically ignores the spread operator on nullish values
  })
}));

const NavigationLogo = (props: NavLogoProps) => {
  const classes = useStyles(props);
  return (
    <Typography className={classes.title} variant="h6" noWrap>
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
