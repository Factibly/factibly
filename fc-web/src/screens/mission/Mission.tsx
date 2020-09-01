import React from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import PageContainer from "../../common/PageContainer";
import FactiblyIntroductoryPanel from "./FactiblyIntroductoryPanel";
import FactiblyTeamPanel from "./FactiblyTeamPanel";
import FactiblyAppPanel from "./FactiblyAppPanel";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > section": {
        display: "inline-block",
        boxSizing: "border-box",
        width: "100%",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(3, 0),
        // overflowX: "scroll",
      },
    },
  })
);

const Mission = () => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <PageContainer className={classes.root}>
      <Helmet>
        <title>{intl.formatMessage({ id: "nav.drawer.item.mission" })}</title>
      </Helmet>
      <FactiblyIntroductoryPanel />
      <FactiblyTeamPanel />
      <FactiblyAppPanel />
    </PageContainer>
  );
};

export default Mission;
