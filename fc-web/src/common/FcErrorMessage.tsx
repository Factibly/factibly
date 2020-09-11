import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import ErrorIcon from "@material-ui/icons/Error";

interface FcErrorMessageProps {
  id: string;
  msg?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      color: theme.palette.error.dark,
      textAlign: "left",
      fontWeight: theme.typography.fontWeightBold,
      fontSize: "small",
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  })
);

const FcErrorMessage = ({ id, msg }: FcErrorMessageProps) => {
  const classes = useStyles();
  return (
    <FormHelperText role="alert" id={id} className={classes.root}>
      <ErrorIcon className={classes.icon} fontSize="small" />
      {msg}
    </FormHelperText>
  );
};

export default FcErrorMessage;
