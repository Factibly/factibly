import React from "react";
import useTheme from "@material-ui/core/styles/useTheme";

interface IconicTextProps {
  id?: string;
  text: string;
  icon: React.ReactNode;
  style?: React.CSSProperties;
}

const IconicText = ({ id, text, icon, style }: IconicTextProps) => {
  const theme = useTheme();

  return (
    <div id={id} style={{ display: "flex", alignItems: "center", ...style }}>
      <span
        id={`${id}--icon`}
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: theme.spacing(0.5),
          marginRight: theme.spacing(0.5),
        }}
        aria-labelledby={`${id}--text`}
      >
        {icon}
      </span>
      <span id={`${id}--text`}>{text}</span>
    </div>
  );
};

export default IconicText;
