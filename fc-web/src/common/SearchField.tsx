import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import Search from "@material-ui/icons/Search";

interface SearchFieldProps {
  name: string;
  label?: string;
  searchText: string;
  onSearchTextChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const SearchField = ({ name, label, searchText, onSearchTextChange }: SearchFieldProps) => {
  return (
    <TextField
      variant="outlined"
      id={`${name}-search`}
      label={label}
      margin="dense"
      value={searchText}
      onChange={onSearchTextChange}
      InputProps={{
        type: "search",
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;
