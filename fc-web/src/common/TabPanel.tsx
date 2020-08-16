import React, { PureComponent } from "react";
import Box from "@material-ui/core/Box";

interface TabPanelProps {
  id?: string;
  dir?: string;
  index: any;
  value: any;
  children?: React.ReactNode;
}

class TabPanel extends PureComponent<TabPanelProps> {
  render() {
    const { id, value, index, children, ...otherProps } = this.props;
    return (
      <div
        role="tabpanel"
        id={id ?? `full-width-tabpanel-${index}`}
        hidden={value !== index}
        aria-labelledby={id ?? `full-width-tab-${index}`}
        {...otherProps}
      >
        {value === index && <Box p={3}> {children} </Box>}
      </div>
    );
  }
}

export default TabPanel;
