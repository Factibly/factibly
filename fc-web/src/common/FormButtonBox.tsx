import React, { PureComponent } from "react";
import { withTheme, WithTheme as WithThemeProps } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";

interface FormButtonBoxProps extends WithThemeProps {
  primaryText: string;
  onPrimaryClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  secondaryText?: string;
  onSecondaryClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  href?: string;
}

class FormButtonBox extends PureComponent<FormButtonBoxProps> {
  render() {
    const { primaryText, onPrimaryClick, secondaryText, onSecondaryClick, href, theme } = this.props;
    const btnStyle = { margin: theme.spacing(0.5, 0) };
    return (
      <Box>
        <Button type="submit" variant="contained" color="primary" onClick={onPrimaryClick} fullWidth style={btnStyle}>
          {primaryText}
        </Button>
        {secondaryText && (
          <Button variant="contained" color="default" href={href} onClick={onSecondaryClick} fullWidth style={btnStyle}>
            {secondaryText}
          </Button>
        )}
      </Box>
    );
  }
}

export default withTheme(FormButtonBox);
