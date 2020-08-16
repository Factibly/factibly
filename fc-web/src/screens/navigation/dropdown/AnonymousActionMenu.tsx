import React from "react";
import { FormattedMessage } from "react-intl";
import DropdownMenuItem from "../../../common/DropdownMenuItem";
import PersonIcon from "@material-ui/icons/Person";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import history from "../../../hooks/history";

const AnonymousActionMenu = () => {
  return (
    <>
      <DropdownMenuItem
        primary={<FormattedMessage id="user.action.login.name" />}
        icon={<PersonIcon />}
        onClick={() => {
          history.push("/account/sign-in");
        }}
      />
      <DropdownMenuItem
        primary={<FormattedMessage id="user.action.register.name" />}
        icon={<HowToRegIcon />}
        onClick={() => {
          history.push("/account/register");
        }}
      />
    </>
  );
};

export default AnonymousActionMenu;
