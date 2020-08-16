import React, { forwardRef, PureComponent } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { TransitionProps } from "@material-ui/core/transitions";
import { Slide, Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";

interface ConfirmationDialogProps extends WrappedComponentProps<"intl"> {
  open: boolean;
  dialogContentText?: string;
  onCancel?: (...args: any[]) => void;
  onReject?: (...args: any[]) => void;
  onApprove: (...args: any[]) => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class ConfirmationDialog extends PureComponent<ConfirmationDialogProps> {
  render() {
    const { open, dialogContentText, onCancel, onReject, onApprove, intl }: ConfirmationDialogProps = this.props;
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        onClose={onCancel}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            {dialogContentText || intl.formatMessage({ id: "general.dialog.confirmation.message" })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onReject}>{intl.formatMessage({ id: "general.action.no" })}</Button>
          <Button onClick={onApprove} autoFocus>
            {intl.formatMessage({ id: "general.action.yes" })}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default injectIntl(ConfirmationDialog);
