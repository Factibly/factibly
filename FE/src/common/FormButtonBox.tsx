import React from "react";
import { Box, Button } from "@material-ui/core";

interface FormButtonBoxProps {
  primaryText: string;
  onPrimaryClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  secondaryText?: string;
  onSecondaryClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  href?: string;
}

const FormButtonBox = ({ primaryText, onPrimaryClick, secondaryText, onSecondaryClick, href }: FormButtonBoxProps) => {
  return (
    <Box className="form-box">
      <Button fullWidth type="submit" variant="contained" color="primary" onClick={onPrimaryClick}>
        {primaryText}
      </Button>
      {secondaryText && (
        <Button fullWidth variant="contained" color="default" onClick={onSecondaryClick} href={href}>
          {secondaryText}
        </Button>
      )}
    </Box>
  );
};

export default FormButtonBox;
