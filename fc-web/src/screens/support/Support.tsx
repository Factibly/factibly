import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import TabPanel from "../../common/TabPanel";
import SupportForm from "./SupportForm";
import Faq from "./Faq";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import supports, { SupportText, isSupportText } from "../../text/support-prompts";

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
}));

const supportTexts: SupportText[] = Object.values(supports);

const Support = () => {
  const classes = useStyles();
  const theme = useTheme();
  const intl = useIntl();

  const [categoryIndex, setCategoryIndex] = useState(parseInt(sessionStorage.getItem("support-category-index") ?? "0"));

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    sessionStorage.setItem("support-category-index", newValue.toString());
    setCategoryIndex(newValue);
  };

  return (
    <div className={classes.root}>
      <Helmet>
        <title> {intl.formatMessage({ id: "nav.drawer.supportFeedback.name" })} </title>
      </Helmet>
      <AppBar position="static" color="default">
        <Tabs
          value={categoryIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          aria-label="Support Category Tabs"
        >
          {supportTexts.map(({ icon: CategoryIcon, nameId }, index) => {
            return (
              <Tab
                key={`support-tab-${nameId}`}
                icon={<CategoryIcon />}
                label={intl.formatMessage({ id: nameId })}
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
      </AppBar>
      {supportTexts.map((supportText, index) => (
        <TabPanel key={`tab-panel-${index}`} value={categoryIndex} index={index} dir={theme.direction}>
          {isSupportText(supportText) ? <SupportForm supportText={supportText} /> : <Faq faqText={supportText} />}
        </TabPanel>
      ))}
    </div>
  );
};

export default Support;
