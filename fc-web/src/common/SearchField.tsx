import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import Search from "@material-ui/icons/Search";

interface SearchFieldProps {
  name: string;
  label?: string;
  searchQuery: string;
  onSearchChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

const SearchField = ({ name, label, searchQuery, onSearchChange }: SearchFieldProps) => {
  return (
    <TextField
      variant="outlined"
      id={`${name}-search`}
      label={label}
      margin="dense"
      value={searchQuery}
      onChange={onSearchChange}
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
