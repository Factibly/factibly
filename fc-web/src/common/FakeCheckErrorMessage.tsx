import React, { PureComponent } from "react";
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles";
import FormHelperText from "@material-ui/core/FormHelperText";

interface FakeCheckErrorMessageProps extends WithStyles<typeof styles> {
  msg: string | object | undefined | null;
}

const styles = createStyles({
  root: {
    color: "red",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: "medium",
    "&::before": {
      display: "inline",
      content: "⚠ ",
    },
  },
});

class FakeCheckErrorMessage extends PureComponent<FakeCheckErrorMessageProps> {
  render() {
    const { classes, msg } = this.props;
    return <FormHelperText className={classes.root}> {msg} </FormHelperText>;
  }
}

export default withStyles(styles)(FakeCheckErrorMessage);
