import React, { PureComponent } from "react";
import { Paper, Typography } from "@material-ui/core";
import { withTheme, WithTheme as WithThemeProps } from "@material-ui/core/styles";

interface BannerProps extends WithThemeProps {
  message: string;
  backgroundColor?: string;
}

class Banner extends PureComponent<BannerProps> {
  render() {
    const { message, backgroundColor, theme } = this.props;
    return (
      <Paper
        variant="outlined"
        style={{ width: "100%", padding: theme.spacing(3), backgroundColor, color: theme.palette.common.white }}
      >
        <Typography gutterBottom> {message} </Typography>
      </Paper>
    );
  }
}

export default withTheme(Banner);
