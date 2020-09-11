import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box, Button, CircularProgress } from "@material-ui/core";

interface FormButtonsProps {
  primaryText: string;
  onPrimaryClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  secondaryText?: string;
  onSecondaryClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  to?: string | object;
  isLoading?: boolean;
  loadingText?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(0.5, 0),
    },
  })
);

const FormButtons = ({
  primaryText,
  onPrimaryClick,
  secondaryText,
  onSecondaryClick,
  to,
  isLoading = false,
  loadingText,
}: FormButtonsProps) => {
  const classes = useStyles();

  return (
    <Box>
      <Button
        className={classes.button}
        type="submit"
        variant="contained"
        color="primary"
        onClick={onPrimaryClick}
        fullWidth
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <CircularProgress size={24} />
            {loadingText && <Button> &emsp;{loadingText}&hellip;</Button>}
          </>
        ) : (
          primaryText
        )}
      </Button>
      {secondaryText &&
        (to ? (
          <Button
            className={classes.button}
            component={RouterLink}
            to={to}
            variant="contained"
            color="default"
            fullWidth
          >
            {secondaryText}
          </Button>
        ) : (
          <Button className={classes.button} variant="contained" color="default" onClick={onSecondaryClick} fullWidth>
            {secondaryText}
          </Button>
        ))}
    </Box>
  );
};

export default FormButtons;
