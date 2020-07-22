import React, { PureComponent } from "react";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";

interface DropdownMenuItemProps {
  primary: string | React.ReactNode;
  primaryTypographyProps?: any;
  icon?: React.ReactNode;
  selected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  children?: React.ReactNode;
  [x: string]: any;
}

class DropdownMenuItem extends PureComponent<DropdownMenuItemProps> {
  render() {
    const { primary, primaryTypographyProps, icon, selected, onClick, children } = this.props;
    return (
      <MenuItem onClick={onClick} selected={selected} {...this.props}>
        {icon && <ListItemIcon> {icon} </ListItemIcon>}
        <ListItemText primary={primary} primaryTypographyProps={primaryTypographyProps} />
        {children}
      </MenuItem>
    );
  }
}

export default DropdownMenuItem;
