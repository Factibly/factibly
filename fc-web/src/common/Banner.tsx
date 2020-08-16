import React, { PureComponent } from "react";
import { Paper, Typography } from "@material-ui/core";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { withTheme, WithTheme as WithThemeProps } from "@material-ui/core/styles";

interface BannerProps extends WrappedComponentProps<"intl">, WithThemeProps {
  msg: string;
  backgroundColor?: string;
}

class Banner extends PureComponent<BannerProps> {
  render() {
    const { msg, backgroundColor, intl, theme } = this.props;
    return (
      <Paper
        variant="outlined"
        style={{ padding: theme.spacing(3), width: "100%", color: theme.palette.common.white, backgroundColor }}
      >
        <Typography variant="h6" gutterBottom>
          {intl.formatMessage({ id: msg })}
        </Typography>
      </Paper>
    );
  }
}

export default withTheme(injectIntl(Banner));
