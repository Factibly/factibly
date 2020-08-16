import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexDirection: "column",
      margin: "auto",
      padding: theme.spacing(3, 27),
      [theme.breakpoints.down("xs")]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },
      [theme.breakpoints.only("sm")]: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
      },
      [theme.breakpoints.only("md")]: {
        paddingLeft: theme.spacing(15),
        paddingRight: theme.spacing(15),
      },
      [theme.breakpoints.only("lg")]: {
        paddingLeft: theme.spacing(21),
        paddingRight: theme.spacing(21),
      },
    },
  })
);

const PageContainer = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default PageContainer;
