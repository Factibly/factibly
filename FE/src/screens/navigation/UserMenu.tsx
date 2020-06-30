import React, { useState } from "react";
import { Button, MenuItem, Menu } from "@material-ui/core";
import { USER_LOGGED_IN } from "../../gql/queries";
import { useQuery } from "@apollo/react-hooks";

const UserMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState();
  const { client } = useQuery(USER_LOGGED_IN);

  const openMenu = event => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={openMenu}>
        Logged In!
      </Button>
      <Menu
        id="simple-menu"
        open={open}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={closeMenu}
      >
        <MenuItem onClick={() => {}}>Profile</MenuItem>
        <MenuItem onClick={() => {}}>My account</MenuItem>
        <MenuItem
          onClick={() => {
            client.writeData({ data: { userLoggedIn: false } });
            localStorage.removeItem("auth_token");
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default UserMenu;
