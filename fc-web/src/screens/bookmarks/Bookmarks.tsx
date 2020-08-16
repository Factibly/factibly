import React from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";

const Bookmarks = () => {
  const intl = useIntl();
  return (
    <>
      <Helmet>
        <title> {intl.formatMessage({ id: "nav.drawer.bookmark.name" })} </title>
      </Helmet>
    </>
  );
};

export default Bookmarks;
