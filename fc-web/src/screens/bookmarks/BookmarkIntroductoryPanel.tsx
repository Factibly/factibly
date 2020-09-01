import React from "react";
import { useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { Button, Typography } from "@material-ui/core";
import history from "../../hooks/history";
import { ACCOUNT_SIGN_IN_PATH } from "../../static/paths";

interface BookmarkIntroductoryPanelProps {
  userLoggedIn: boolean;
}

const BookmarkIntroductoryPanel = ({ userLoggedIn }: BookmarkIntroductoryPanelProps) => {
  const location = useLocation();
  const intl = useIntl();

  const handleLogInClick = () =>
    history.replace({
      pathname: ACCOUNT_SIGN_IN_PATH,
      state: { from: location.pathname },
    });

  return (
    <>
      <Typography component="h2" variant="h5">
        {userLoggedIn ? (
          <b>{intl.formatMessage({ id: "bookmarks.intro.header.noBookmarks" })}</b>
        ) : (
          <b>{intl.formatMessage({ id: "bookmarks.intro.header.signinRequired" })}</b>
        )}
      </Typography>
      <Typography component="div" variant="body1" paragraph>
        {intl.formatMessage({ id: "bookmarks.intro.benefits" })}
        <Typography component="ul" variant="body1">
          {Array.apply(null, Array(3)).map((_, i) => (
            <li key={`bookmark-benefit-${i}`}>{intl.formatMessage({ id: `bookmarks.intro.benefits.${i + 1}` })}</li>
          ))}
        </Typography>
      </Typography>
      {!userLoggedIn && (
        <Button variant="contained" color="primary" size="large" onClick={handleLogInClick}>
          {intl.formatMessage({ id: "user.action.login" })}
        </Button>
      )}
    </>
  );
};

export default BookmarkIntroductoryPanel;
