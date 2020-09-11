import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import clsx from "clsx";

interface NavigationLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

const NavigationLogo = ({ className, style }: NavigationLogoProps) => (
  <Typography className={clsx(className)} component="h1" variant="h6" noWrap style={{ ...style }}>
    <Button component={RouterLink} to="/">
      <img src="/images/factibly-logo--full.png" alt="factibly logo" />
    </Button>
  </Typography>
);

export default NavigationLogo;
