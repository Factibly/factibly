import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput, { OutlinedInputProps } from "@material-ui/core/OutlinedInput";
import FakeCheckErrorMessage from "./FakeCheckErrorMessage";

interface TextInputProps extends OutlinedInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (input: any) => void;
  errors?: string;
  helperText?: string;
  type?: string;
  children?: any;
}

const TextInput = ({
  name,
  label,
  value,
  onChange,
  errors = "",
  helperText = "",
  type,
  children,
  ...otherProps
}: TextInputProps) => {
  return (
    <FormControl variant="outlined" style={{ width: "100%" }}>
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        name={name}
        type={type}
        fullWidth
        onChange={onChange}
        label={label}
        value={value || ""}
        error={errors.length > 0}
        {...otherProps}
      />
      <FormHelperText> {helperText} </FormHelperText>
      {errors && <FakeCheckErrorMessage msg={errors} />}
      {children}
    </FormControl>
  );
};

export default TextInput;
