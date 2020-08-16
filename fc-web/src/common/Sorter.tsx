import React, { Component } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { TextField, OutlinedTextFieldProps, FormControl, MenuItem, InputAdornment } from "@material-ui/core";
import clsx from "clsx";

export type SortCategories = Readonly<{ nameId: string; comparator: (a: any, b: any) => number }[]>;

interface SorterProps extends WrappedComponentProps<"intl">, OutlinedTextFieldProps {
  className?: string;
  name: string;
  sortCategories: SortCategories;
  sortCategoryIndex: number;
  onSortingChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  startIcon?: React.ReactNode;
  disableDefaultOption?: boolean;
}

class Sorter extends Component<SorterProps> {
  render() {
    const {
      className,
      name,
      sortCategories,
      sortCategoryIndex,
      onSortingChange,
      startIcon,
      intl,
      disableDefaultOption = false,
      ...otherProps
    } = this.props;
    return (
      <FormControl className={clsx(className)} variant="outlined">
        <TextField
          id={`${name}-sorter`}
          select
          value={sortCategoryIndex}
          onChange={onSortingChange}
          InputProps={{
            startAdornment: startIcon && <InputAdornment position="start">{startIcon}</InputAdornment>,
          }}
          {...otherProps}
        >
          {!disableDefaultOption && (
            <MenuItem key={`${name}-sort-default`} value={-1}>
              {intl.formatMessage({ id: "general.unit.default" })}
            </MenuItem>
          )}
          {sortCategories.map(({ nameId }, index) => (
            <MenuItem key={`${name}-sort-${nameId}`} value={index}>
              {intl.formatMessage({ id: nameId })}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    );
  }
}

export default injectIntl(Sorter);
