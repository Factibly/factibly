import React, { PureComponent } from "react";
import Menu, { MenuProps } from "@material-ui/core/Menu";

class StyledMenu extends PureComponent<MenuProps> {
  render = () => (
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
      {...this.props}
    />
  );
}

export default StyledMenu;
