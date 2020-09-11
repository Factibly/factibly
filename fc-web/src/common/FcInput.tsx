import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput, { OutlinedInputProps } from "@material-ui/core/OutlinedInput";
import FcErrorMessage from "./FcErrorMessage";

interface FcInputProps extends OutlinedInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  type?: string;
  errorMsg?: string;
  helperText?: string;
  children?: React.ReactNode;
}

const FcInput = ({
  name,
  label,
  value,
  onChange,
  type,
  errorMsg = "",
  helperText = "",
  children,
  ...otherProps
}: FcInputProps) => {
  return (
    <FormControl variant="outlined" style={{ width: "100%" }}>
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <OutlinedInput
        id={label}
        name={name}
        type={type}
        label={label}
        value={value || ""}
        error={errorMsg.length > 0}
        onChange={onChange}
        fullWidth
        aria-invalid={!!errorMsg}
        aria-describedby={errorMsg ? `${label}-error-message` : `${label}-helper-text`}
        {...otherProps}
      />
      {helperText && <FormHelperText id={`${label}-helper-text`}>{helperText}</FormHelperText>}
      {errorMsg && <FcErrorMessage id={`${label}-error-message`} msg={errorMsg} />}
      {children}
    </FormControl>
  );
};

export default FcInput;
