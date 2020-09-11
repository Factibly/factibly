import React, { PureComponent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { injectIntl, WrappedComponentProps } from "react-intl";
import DropdownMenuItem from "../../../common/DropdownMenuItem";
import PersonIcon from "@material-ui/icons/Person";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import { ACCOUNT_SIGN_IN_PATH, ACCOUNT_REGISTER_PATH } from "../../../static/paths";

interface AnonymousActionMenuProps extends WrappedComponentProps<"intl"> {}

const actions = Object.freeze([
  {
    primaryNameId: "user.action.login",
    icon: <PersonIcon />,
    to: ACCOUNT_SIGN_IN_PATH,
  },
  {
    primaryNameId: "user.action.register",
    icon: <HowToRegIcon />,
    to: ACCOUNT_REGISTER_PATH,
  },
]);

class AnonymousActionMenu extends PureComponent<AnonymousActionMenuProps> {
  render() {
    return (
      <>
        {actions.map(({ primaryNameId, icon, to }) => (
          <DropdownMenuItem
            key={`anonymous-action-menu-item-${primaryNameId}`}
            button
            component={RouterLink}
            to={to}
            primary={this.props.intl.formatMessage({ id: primaryNameId })}
            icon={icon}
          />
        ))}
      </>
    );
  }
}

export default injectIntl(AnonymousActionMenu);
