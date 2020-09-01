import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";

interface IconicTextProps {
  text: string;
  icon: React.ReactNode;
  style?: React.CSSProperties;
}

const IconicText = ({ text, icon, style }: IconicTextProps) => {
  const theme = useTheme();
  return (
    <div style={{ display: "flex", alignItems: "center", ...style }}>
      <span
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: theme.spacing(0.5),
          marginRight: theme.spacing(0.5),
        }}
      >
        {icon}
      </span>
      {text}
    </div>
  );
};

export default IconicText;
