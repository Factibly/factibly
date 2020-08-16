import React from "react";

interface FlexProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [x: string]: any;
}

const Flex = ({ children, style, ...otherProps }: FlexProps) => {
  return (
    <div style={{ display: "flex", width: "100%", ...style }} {...otherProps}>
      {children}
    </div>
  );
};

export default Flex;
