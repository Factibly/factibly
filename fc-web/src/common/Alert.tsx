import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useAlert } from "../hooks/useAlert";

export interface BaseAlertProps {
  severity: "success" | "info" | "warning" | "error" | undefined;
  duration?: number;
  message: string;
}

interface AlertProps extends BaseAlertProps {
  open: boolean;
  onClose: () => void;
}

const Alert = ({ open, onClose, severity, duration = 5000, message }: AlertProps) => {
  return (
    <Snackbar
      role="status"
      open={open}
      transitionDuration={500}
      autoHideDuration={duration}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={onClose}
      disableWindowBlurListener
    >
      <MuiAlert elevation={6} variant="filled" onClose={onClose} severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

const AlertWrapper = () => {
  const [alert, setAlert] = useAlert();

  const onClose = () => {
    setAlert(null);
  };

  return alert && <Alert {...alert} open={!!alert} onClose={onClose} />;
};

export default AlertWrapper;
