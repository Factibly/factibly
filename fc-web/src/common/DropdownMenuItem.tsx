import React, { PureComponent } from "react";
import { MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";

interface DropdownMenuItemProps {
  primary: string | React.ReactNode;
  icon?: React.ReactNode;
  selected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  children?: React.ReactNode;
  [x: string]: any;
}

class DropdownMenuItem extends PureComponent<DropdownMenuItemProps> {
  render() {
    const { primary, icon, selected, onClick, children, ...otherProps } = this.props;
    return (
      <MenuItem onClick={onClick} selected={selected} {...otherProps}>
        {icon && <ListItemIcon> {icon} </ListItemIcon>}
        <ListItemText primary={primary} />
        {children}
      </MenuItem>
    );
  }
}

export default DropdownMenuItem;
