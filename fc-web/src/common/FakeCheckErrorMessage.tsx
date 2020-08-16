import React, { PureComponent } from "react";
import {
  withTheme,
  withStyles,
  WithStyles as WithStylesProps,
  WithTheme as WithThemeProps,
  createStyles,
} from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";
import ErrorIcon from "@material-ui/icons/Error";

interface FakeCheckErrorMessageProps extends WithStylesProps<typeof styles>, WithThemeProps {
  id: string;
  msg?: string;
}

const styles = createStyles({
  root: {
    display: "flex",
    alignItems: "center",
    color: "red",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "small",
    // "&::before": {
    //   display: "inline",
    //   content: "⚠ ",
    // },
  },
});

class FakeCheckErrorMessage extends PureComponent<FakeCheckErrorMessageProps> {
  render() {
    const { id, classes, msg, theme } = this.props;
    return (
      <FormHelperText role="alert" id={id} className={classes.root}>
        <ErrorIcon fontSize="small" style={{ marginRight: theme.spacing(1) }} />
        {msg}
      </FormHelperText>
    );
  }
}

export default withStyles(styles)(withTheme(FakeCheckErrorMessage));
