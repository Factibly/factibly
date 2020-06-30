import React, { PureComponent } from "react";

interface SmallCircleIconProps {
  content: string | number;
}

class SmallCircleIcon extends PureComponent<SmallCircleIconProps> {
  render() {
    return (
      <span className="fa-stack fa-1x">
        <i className="fa fa-circle fa-stack-2x text-primary"></i>
        <strong className="fa-stack-1x" style={{ color: "white" }}>
          {this.props.content}
        </strong>
      </span>
    );
  }
}

export default SmallCircleIcon;
