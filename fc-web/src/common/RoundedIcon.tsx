import React from "react";
import { Avatar } from "@material-ui/core";

interface RoundedIconProps {
  className?: string;
  backgroundColor?: string;
  iconHeight?: number;
  iconWidth?: number;
  iconColor?: string;
  style?: any;
  clickable?: boolean;
  icon: any;
}

const RoundedIcon = ({
  className,
  backgroundColor,
  icon,
  iconWidth,
  iconHeight,
  iconColor,
  clickable,
  style,
}: RoundedIconProps) => {
  const Icon = icon;

  return (
    <Avatar
      className={className}
      style={{
        height: iconHeight,
        width: iconWidth,
        background: backgroundColor,
        color: iconColor || "black",
        cursor: clickable ? "pointer" : "default",
        ...style,
      }}
    >
      <Icon fontSize="large" />
    </Avatar>
  );
};

export default RoundedIcon;
