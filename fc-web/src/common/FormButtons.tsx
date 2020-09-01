import React, { PureComponent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { withTheme, WithTheme as WithThemeProps } from "@material-ui/core/styles";
import { Box, Button, CircularProgress } from "@material-ui/core";

interface FormButtonsProps extends WithThemeProps {
  primaryText: string;
  onPrimaryClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  secondaryText?: string;
  onSecondaryClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  to?: string | object;
  isLoading?: boolean;
  loadingText?: string;
}

class FormButtons extends PureComponent<FormButtonsProps> {
  render() {
    const {
      primaryText,
      onPrimaryClick,
      secondaryText,
      onSecondaryClick,
      to,
      isLoading = false,
      loadingText,
      theme,
    } = this.props;

    const btnStyle = { margin: theme.spacing(0.5, 0) };

    return (
      <Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={onPrimaryClick}
          fullWidth
          disabled={isLoading}
          style={btnStyle}
        >
          {isLoading ? (
            <>
              <CircularProgress size={24} />
              {loadingText && <> &emsp;{loadingText}&hellip;</>}
            </>
          ) : (
            primaryText
          )}
        </Button>
        {secondaryText &&
          (to ? (
            <Button component={RouterLink} variant="contained" color="default" to={to} fullWidth style={btnStyle}>
              {secondaryText}
            </Button>
          ) : (
            <Button variant="contained" color="default" onClick={onSecondaryClick} fullWidth style={btnStyle}>
              {secondaryText}
            </Button>
          ))}
      </Box>
    );
  }
}

export default withTheme(FormButtons);
