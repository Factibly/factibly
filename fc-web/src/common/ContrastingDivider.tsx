import React from "react";
import Divider from "@material-ui/core/Divider";
import grey from "@material-ui/core/colors/grey";

interface ContrastingDividerProps {
  hideLine?: boolean;
}

const ContrastingDivider = ({ hideLine = false }: ContrastingDividerProps) => {
  return <Divider style={{ visibility: hideLine ? "hidden" : "visible", margin: 0, backgroundColor: grey[50] }} />;
};

export default ContrastingDivider;
