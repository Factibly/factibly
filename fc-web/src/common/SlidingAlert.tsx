import React, { useState } from "react";
import { useIntl } from "react-intl";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import CloseIcon from "@material-ui/icons/Close";

interface SlidingAlertProps {
  title?: string;
  severity?: "info" | "success" | "warning" | "error";
  children?: React.ReactNode;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      borderRadius: 0,
    },
  })
);

const SlidingAlert = ({ title, severity = "info", children }: SlidingAlertProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const [showAlert, setShowAlert] = useState<boolean>(true);

  return (
    <Slide direction="down" in={showAlert} appear unmountOnExit>
      <Alert
        className={classes.root}
        variant="filled"
        severity={severity}
        action={
          <IconButton
            color="inherit"
            size="medium"
            onClick={() => setShowAlert(false)}
            aria-label={intl.formatMessage({ id: "general.action.close.aria" })}
          >
            <CloseIcon />
          </IconButton>
        }
        square
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {children}
      </Alert>
    </Slide>
  );
};

export default SlidingAlert;
