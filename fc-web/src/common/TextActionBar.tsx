import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { OutlinedInput, InputAdornment, Button } from "@material-ui/core";

interface TextActionBarProps {
  value: string;
  actionName: string;
  onActionClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  "aria-label"?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputRoot: {
      paddingRight: 0,
    },
    inputInput: {
      padding: theme.spacing(1),
    },
    inputAdornment: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  })
);

const TextActionBar = (props: TextActionBarProps) => {
  const { value, actionName, onActionClick } = props;

  const classes = useStyles();

  return (
    <OutlinedInput
      classes={{ root: classes.inputRoot, input: classes.inputInput }}
      value={value}
      endAdornment={
        <InputAdornment className={classes.inputAdornment} variant="standard" position="end">
          <Button onClick={onActionClick}>{actionName}</Button>
        </InputAdornment>
      }
      inputProps={{ "aria-label": props["aria-label"] }}
      fullWidth
      readOnly
    />
  );
};

export default TextActionBar;
