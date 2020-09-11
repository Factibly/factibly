import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { InputBase, InputAdornment, IconButton, Button, Tooltip, InputBaseClassKey } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";

interface SearchBarProps {
  classes?: Partial<Record<InputBaseClassKey, string>>;
  autoComplete?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  apv: number;
  aph: number;
  dynamicSizing?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
    },
    clearButton: {
      color: theme.palette.primary.contrastText,
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    searchInputAdornment: {
      display: "flex",
      height: "100%",
      padding: ({ apv, aph }: any) => theme.spacing(apv, aph), // hack
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      backgroundColor: grey[600],
      color: theme.palette.common.white,
      cursor: "pointer",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
      [theme.breakpoints.down("sm")]: {
        padding: ({ apv, aph, dynamicSizing }: any) => theme.spacing(apv, dynamicSizing ? aph - 1 : aph),
      },
      [theme.breakpoints.down("xs")]: {
        padding: ({ apv, aph, dynamicSizing }: any) => theme.spacing(apv, dynamicSizing ? aph - 2 : aph),
      },
    },
  })
);

const SearchBar = ({
  classes: clazzes,
  autoComplete,
  value,
  onChange,
  onClear,
  onFocus,
  onBlur,
  apv,
  aph,
  dynamicSizing = false,
}: SearchBarProps) => {
  const classes = useStyles({ apv, aph, dynamicSizing });
  const intl = useIntl();

  const handleMouseDownClear = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();

  return (
    <InputBase
      className={classes.root}
      classes={{ ...clazzes }}
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
              component={Button}
              type="submit"
              position="end"
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
    />
  );
};

export default SearchBar;
