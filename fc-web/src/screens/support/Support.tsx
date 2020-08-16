import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSupportTab } from "../../store/support/actions";
import { RootState } from "../../store/rootReducer";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import { useTheme } from "@material-ui/core/styles";
import TabPanel from "../../common/TabPanel";
import SupportForm from "./SupportForm";
import Faq from "./Faq";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import supports, { SupportText, isSupportText } from "../../static/data/support-prompts";

const supportTexts: Readonly<SupportText[]> = Object.freeze(Object.values(supports));

const Support = () => {
  const dispatch = useDispatch();
  const tabIndex: number = useSelector((state: RootState) => state.supportReducer.tabIndex);

  const theme = useTheme();
  const intl = useIntl();

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => setSupportTab(newValue)(dispatch);

  return (
    <div style={{ width: "100%" }}>
      <Helmet>
        <title> {intl.formatMessage({ id: "nav.drawer.item.supportFeedback" })} </title>
      </Helmet>
      <AppBar position="static" color="default">
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          aria-label={intl.formatMessage({ id: "support.tabs.aria" })}
        >
          {supportTexts.map(({ id, icon: CategoryIcon, nameId }) => {
            return (
              <Tab
                key={`support-tab-${id}`}
                id={id}
                icon={<CategoryIcon />}
                label={intl.formatMessage({ id: nameId })}
                aria-controls={`tab-panel-${id}`}
              />
            );
          })}
        </Tabs>
      </AppBar>
      {supportTexts.map((supportText, index) => (
        <TabPanel
          key={`support-tab-panel-${supportText.id}`}
          id={`tab-panel-${supportText.id}`}
          value={tabIndex}
          index={index}
          dir={theme.direction}
        >
          {isSupportText(supportText) ? <SupportForm supportText={supportText} /> : <Faq faqText={supportText} />}
        </TabPanel>
      ))}
    </div>
  );
};

export default Support;
