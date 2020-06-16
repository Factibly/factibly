import React, { Component } from "react";
import "../styles/universal.css";

interface ComponentProps {
  msg: string | object | undefined | null;
}

interface ComponentState {}

class ErrorMessage extends Component<ComponentProps, ComponentState> {
  render() {
    return <p className="form-error-msg-1"> {this.props.msg} </p>;
  }
}

export default ErrorMessage;
