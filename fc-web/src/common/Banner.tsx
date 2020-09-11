import React, { PureComponent } from "react";
import { Paper, Typography } from "@material-ui/core";
import { withTheme, WithTheme as WithThemeProps } from "@material-ui/core/styles";

interface BannerProps extends WithThemeProps {
  role?: string;
  severity: "error" | "warning" | "info" | "success";
  message: string;
  children?: React.ReactNode;
}

class Banner extends PureComponent<BannerProps> {
  render() {
    const { role, severity, message, children, theme } = this.props;
    return (
      <Paper
        role={role}
        variant="outlined"
        style={{
          width: "100%",
          padding: theme.spacing(3),
          backgroundColor: theme.palette[severity]?.main,
          color: theme.palette.common.white,
        }}
      >
        <Typography gutterBottom>{message}</Typography>
        {children}
      </Paper>
    );
  }
}

export default withTheme(Banner);
