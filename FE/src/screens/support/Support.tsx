import React, { useState } from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import TabPanel from "../../common/TabPanel";
import SupportForm from "./SupportForm";
import Faq from "./Faq";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import supportTexts, { isSupportText } from "../../text/support-texts";

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    width: "100%"
  }
}));

const stKeys: string[] = Object.keys(supportTexts);

const Support = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [categoryIndex, setCategoryIndex] = useState(parseInt(sessionStorage.getItem("support-category-index") ?? "0"));

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    sessionStorage.setItem("support-category-index", newValue.toString());
    setCategoryIndex(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={categoryIndex}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          aria-label="Support Category Tabs"
        >
          {stKeys.map((key, index) => {
            const CategoryIcon = supportTexts[key].icon;
            return (
              <Tab key={`${key}-tab`} icon={<CategoryIcon />} label={supportTexts[key].name} {...a11yProps(index)} />
            );
          })}
        </Tabs>
      </AppBar>
      {stKeys.map((key, index) => (
        <TabPanel key={`${key}-tab-panel`} value={categoryIndex} index={index} dir={theme.direction}>
          {isSupportText(supportTexts[key]) ? (
            <SupportForm supportText={supportTexts[key]} />
          ) : (
            <Faq faqText={supportTexts[key]} />
          )}
        </TabPanel>
      ))}
    </div>
  );
};

export default Support;
