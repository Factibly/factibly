import React, { PureComponent } from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import "../styles/universal.css";

interface ErrorMessageProps {
  msg: string | object | undefined | null;
}

class ErrorMessage extends PureComponent<ErrorMessageProps> {
  render() {
    return <FormHelperText className="form-error-msg-1"> {this.props.msg} </FormHelperText>;
  }
}

export default ErrorMessage;
