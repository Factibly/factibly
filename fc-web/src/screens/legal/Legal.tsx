import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import TabPanel from "../../common/TabPanel";
import PrivacyPolicy from "./policies/PrivacyPolicy";
import LegalContact from "./LegalContact";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import history from "../../hooks/history";
import {
  LEGAL_PRIVACY_POLICY_PATH,
  LEGAL_COOKIE_POLICY_PATH,
  LEGAL_FAIR_USE_POLICY_PATH,
  LEGAL_CONTACT_PATH,
} from "../../static/paths";

const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    "& *": {
      textTransform: "none",
    },
  },
}));

const legals = Object.freeze([
  {
    labelId: "legal.privacy",
    path: LEGAL_PRIVACY_POLICY_PATH,
    children: <PrivacyPolicy />,
  },
  {
    labelId: "legal.cookie",
    path: LEGAL_COOKIE_POLICY_PATH,
    children: <h2> </h2>,
  },
  {
    labelId: "legal.fairUse",
    path: LEGAL_FAIR_USE_POLICY_PATH,
    children: <h2> </h2>,
  },
  {
    labelId: "legal.contact",
    path: LEGAL_CONTACT_PATH,
    children: <LegalContact />,
  },
]);

function findLegalIndex(path: string) {
  let legalIndex = 0;
  for (let i = 0; i < legals.length; i++) {
    if (legals[i].path === path) {
      legalIndex = i;
      break;
    }
  }
  return legalIndex;
}

const Legal = () => {
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const intl = useIntl();

  const [legalTab, setLegalTab] = useState<number>(0);
  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => history.push(legals[newValue].path);

  useEffect(() => {
    setLegalTab(findLegalIndex(location.pathname));
  }, [location.pathname]);

  return (
    <div>
      <Helmet>
        <title>{intl.formatMessage({ id: "legal.legal" })} - Factibly</title>
      </Helmet>
      <AppBar position="static" color="default">
        <Tabs
          className={classes.tabs}
          orientation="horizontal"
          variant="scrollable"
          indicatorColor="primary"
          value={legalTab}
          onChange={handleTabChange}
          aria-label={intl.formatMessage({ id: "legal.tabs.aria" })}
        >
          {legals.map(({ labelId }, i) => (
            <Tab
              key={`legal-tab-${labelId}`}
              id={`legal-tab-${i}`}
              label={intl.formatMessage({ id: labelId })}
              aria-controls={`legal-tab-panel-${i}`}
            />
          ))}
        </Tabs>
      </AppBar>
      {legals.map(({ labelId, children }, i) => (
        <TabPanel
          key={`legal-tab-panel-${labelId}`}
          id={`legal-tab-panel-${i}`}
          value={legalTab}
          index={i}
          dir={theme.direction}
        >
          {children}
        </TabPanel>
      ))}
    </div>
  );
};

export default Legal;
