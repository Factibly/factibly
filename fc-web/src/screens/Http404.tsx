import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import PageContainer from "../common/PageContainer";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { findClosestPathname } from "../utils/string-utils";
import * as paths from "../static/paths";

const Http404 = () => {
  const intl = useIntl();

  const [closestPathname, setClosestPathname] = useState<string | null>(null);

  useEffect(() => findClosestPathname(paths, setClosestPathname), []);

  return (
    <PageContainer>
      <Helmet>
        <title>{intl.formatMessage({ id: "app.http.404" })} - Factibly</title>
      </Helmet>
      <Typography component="h2" variant="h3" gutterBottom>
        &#128533; {intl.formatMessage({ id: "app.http.404" })}
      </Typography>
      <Typography variant="body1">
        {intl.formatMessage({ id: "app.http.404.terribleJadonJoke" })}&hellip;
        {closestPathname && (
          <>
            <br />
            {intl.formatMessage(
              { id: "app.http.404.redirect.suggestion" },
              {
                url: (
                  <Link key={`redirect-suggestion-${closestPathname}`} component={RouterLink} to={closestPathname}>
                    {`${window.location.protocol}//${window.location.host}${closestPathname}`}
                  </Link>
                ),
              }
            )}
          </>
        )}
      </Typography>
    </PageContainer>
  );
};

export default Http404;
