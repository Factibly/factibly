import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

interface ThickDividerProps {
  orientation?: "horizontal" | "vertical";
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      backgroundColor: grey[700],
    },
  })
);

const HeavyDivider = ({ orientation = "horizontal" }: ThickDividerProps) => {
  const classes = useStyles();
  return <Divider className={classes.divider} orientation={orientation} variant="middle" flexItem />;
};

export default HeavyDivider;
