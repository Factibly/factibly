import React, { PureComponent } from "react";
import Box from "@material-ui/core/Box";

interface TabPanelProps {
  id?: string;
  dir?: string;
  value: any;
  index: any;
  p?: number;
  children?: React.ReactNode;
}

class TabPanel extends PureComponent<TabPanelProps> {
  render() {
    const { id, value, index, p = 0, children, ...otherProps } = this.props;
    return (
      <div
        role="tabpanel"
        id={id ?? `full-width-tabpanel-${index}`}
        hidden={value !== index}
        aria-labelledby={id ?? `full-width-tab-${index}`}
        {...otherProps}
      >
        {value === index && <Box p={p}>{children}</Box>}
      </div>
    );
  }
}

export default TabPanel;
