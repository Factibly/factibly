import React, { PureComponent } from "react";
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
    href: ACCOUNT_SIGN_IN_PATH,
  },
  {
    primaryNameId: "user.action.register",
    icon: <HowToRegIcon />,
    href: ACCOUNT_REGISTER_PATH,
  },
]);

class AnonymousActionMenu extends PureComponent<AnonymousActionMenuProps> {
  render() {
    return (
      <>
        {actions.map(({ primaryNameId, icon, href }) => (
          <DropdownMenuItem
            key={`anonymous-action-menu-item-${primaryNameId}`}
            component="a"
            button
            primary={this.props.intl.formatMessage({ id: primaryNameId })}
            icon={icon}
            href={href}
          />
        ))}
      </>
    );
  }
}

export default injectIntl(AnonymousActionMenu);
