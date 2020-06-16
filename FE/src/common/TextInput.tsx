import React, { useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ErrorMessage from "./ErrorMessage";

const TextInput = props => {
  const { name, label, value, handleChange, error } = props;

  return (
    <FormControl variant="outlined">
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        name={name}
        type={props.type}
        fullWidth
        autoFocus
        onChange={handleChange}
        label={label}
        value={value || ""}
      />
      {error && <ErrorMessage msg={error} />}
      {props.children}
    </FormControl>
  );
};

export default TextInput;
