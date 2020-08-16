import React, { PureComponent } from "react";
import { withTheme, WithTheme as WithThemeProps } from "@material-ui/core/styles";

interface SmallCircleIconProps extends WithThemeProps {
  content: string | number;
}

class SmallCircleIcon extends PureComponent<SmallCircleIconProps> {
  render() {
    const { content, theme } = this.props;
    return (
      <span className="fa-stack fa-1x">
        <i className="fa fa-circle fa-stack-2x text-primary"></i>
        <strong className="fa-stack-1x" style={{ color: theme.palette.common.white }}>
          {content}
        </strong>
      </span>
    );
  }
}

export default withTheme(SmallCircleIcon);
