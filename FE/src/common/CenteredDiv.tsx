import React from "react";
import Flex from "./Flex";

interface CenteredDivProps {
  children?: React.ReactNode;
  style?: any;
  [x: string]: any;
}

const CenteredDiv = ({ style, children, ...otherProps }: CenteredDivProps) => {
  return (
    <Flex style={{ justifyContent: "center", alignItems: "center", ...style }} {...otherProps}>
      {children}
    </Flex>
  );
};

export default CenteredDiv;
