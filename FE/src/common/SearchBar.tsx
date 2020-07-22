import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { InputBase, InputAdornment, IconButton } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Search, Clear } from "@material-ui/icons";

interface SearchBarProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: any;
  onClear?: () => void;
  adornmentPaddingTopBottom?: number;
  useContrastingColor?: boolean;
  hideSearchButtonOnTiny?: boolean;
  extensionClasses?: any;
  style?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
    },
    searchInputAdornment: {
      height: "100%",
      padding: ({ adornmentPaddingTopBottom }: SearchBarProps) =>
        `${adornmentPaddingTopBottom ?? 0}px ${theme.spacing(2)}px`, // hack
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      backgroundColor: grey[600],
      display: "flex",
      [theme.breakpoints.down("xs")]: {
        display: ({ hideSearchButtonOnTiny }: SearchBarProps) => (hideSearchButtonOnTiny ? "none" : "flex"),
      },
    },
    clearButton: {
      color: ({ useContrastingColor }: SearchBarProps) =>
        useContrastingColor ? theme.palette.primary.contrastText : undefined,
    },
    searchButton: {
      color: theme.palette.common.white,
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  })
);

const SearchBar = (props: SearchBarProps) => {
  const { value, onChange, onSubmit, onClear, extensionClasses, style } = props;
  const classes = useStyles(props);
  const intl = useIntl();

  const handleMouseDownClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <InputBase
      className={classes.root}
      classes={{ ...extensionClasses }}
      fullWidth
      role="searchbox"
      placeholder={intl.formatMessage({ id: "home.search.prompt.name" })}
      value={value}
      onChange={onChange}
      endAdornment={
        <>
          {value && onClear && (
            <InputAdornment position="end">
              <IconButton
                className={classes.clearButton}
                aria-label="clear search query"
                onMouseDown={handleMouseDownClear}
                onClick={onClear}
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          )}
          <InputAdornment className={classes.searchInputAdornment} variant="filled" position="end">
            <IconButton className={classes.searchButton} aria-label="search" onClick={onSubmit}>
              <Search />
            </IconButton>
          </InputAdornment>
        </>
      }
      inputProps={{ "aria-label": "search" }}
      style={{ ...style }}
    />
  );
};

export default SearchBar;
