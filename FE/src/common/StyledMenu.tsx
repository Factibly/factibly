import React from "react";
import Menu, { MenuProps } from "@material-ui/core/Menu";

const StyledMenu = (props: MenuProps) => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    elevation={2}
    {...props}
  />
);

export default StyledMenu;
