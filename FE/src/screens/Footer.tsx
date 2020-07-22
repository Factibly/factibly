import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import { grey } from "@material-ui/core/colors";

class Footer extends Component {
  render() {
    return (
      <Box component="footer" bgcolor={grey[900]} color="primary.contrastText">
        {/* <div style={{ textAlign: "end" }}>
        </div> */}
        <div style={{ textAlign: "center" }}>&copy; 2020 Sapphire Labs. All rights reserved.</div>
      </Box>
    );
  }
}

export default Footer;
