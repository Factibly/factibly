import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useIntl } from "react-intl";
import SlidingAlert from "../../common/SlidingAlert";
import Link from "@material-ui/core/Link";
import { LEGAL_PRIVACY_POLICY_PATH } from "../../static/paths";

const AuthenticationCookieAlert = () => {
  const intl = useIntl();

  return (
    <SlidingAlert title={intl.formatMessage({ id: "user.alert.cookie.disabled" })} severity="error">
      {intl.formatMessage(
        { id: "user.alert.cookie.disabled.description" },
        {
          pp: (
            <Link key="auth-cookie-alert-pp" component={RouterLink} to={LEGAL_PRIVACY_POLICY_PATH} color="inherit">
              {intl.formatMessage({ id: "legal.privacy" })}
            </Link>
          ),
        }
      )}
    </SlidingAlert>
  );
};

export default AuthenticationCookieAlert;
