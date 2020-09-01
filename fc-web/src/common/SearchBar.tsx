import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { InputBase, InputAdornment, IconButton, Tooltip } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";

interface SearchBarProps {
  classes?: any;
  autoComplete?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: any;
  onClear?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  adornmentPaddingTopBottom?: number;
  useContrastingColor?: boolean;
  hideSearchButtonOnTiny?: boolean;
  style?: React.CSSProperties;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
    },
    clearButton: {
      color: ({ useContrastingColor }: any) => (useContrastingColor ? theme.palette.primary.contrastText : undefined),
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    searchInputAdornment: {
      display: "flex",
      height: "100%",
      padding: ({ adornmentPaddingTopBottom }: any) => `${adornmentPaddingTopBottom}px ${theme.spacing(3)}px`, // hack
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      backgroundColor: grey[600],
      color: theme.palette.common.white,
      cursor: "pointer",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
      [theme.breakpoints.down("xs")]: {
        display: ({ hideSearchButtonOnTiny }: any) => (hideSearchButtonOnTiny ? "none" : "flex"),
      },
    },
  })
);

const SearchBar = ({
  classes: extensionClasses,
  autoComplete,
  value,
  onChange,
  onSubmit,
  onClear,
  onFocus,
  onBlur,
  adornmentPaddingTopBottom = 0,
  useContrastingColor = false,
  hideSearchButtonOnTiny = false,
  style,
}: SearchBarProps) => {
  const classes = useStyles({ adornmentPaddingTopBottom, useContrastingColor, hideSearchButtonOnTiny });
  const intl = useIntl();

  const handleMouseDownClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <InputBase
      className={classes.root}
      classes={{ ...extensionClasses }}
      placeholder={intl.formatMessage({ id: "home.search.prompt" })}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      fullWidth
      endAdornment={
        <>
          {value && onClear && (
            <InputAdornment position="end">
              <IconButton
                className={classes.clearButton}
                onMouseDown={handleMouseDownClear}
                onClick={onClear}
                aria-label={intl.formatMessage({ id: "general.action.search.clear.aria" })}
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          )}
          <Tooltip title={intl.formatMessage({ id: "general.action.search" })}>
            <InputAdornment
              className={classes.searchInputAdornment}
              variant="filled"
              position="end"
              role="button"
              tabIndex={0}
              onClick={onSubmit}
              aria-label={intl.formatMessage({ id: "general.action.search.submit.aria" })}
            >
              <Search />
            </InputAdornment>
          </Tooltip>
        </>
      }
      inputProps={{
        autoComplete,
        role: "searchbox",
        "aria-label": intl.formatMessage({ id: "home.search.prompt" }),
      }}
      aria-label={intl.formatMessage({ id: "general.action.search.aria" })}
      style={{ ...style }}
    />
  );
};

export default SearchBar;
