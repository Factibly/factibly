import React from "react";

interface CenteredDivProps {
  children?: React.ReactNode;
  style?: any;
  [x: string]: any;
}

const CenteredDivAbs = ({ style, children, ...otherProps }: CenteredDivProps) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        textAlign: "center",
        ...style,
      }}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default CenteredDivAbs;
