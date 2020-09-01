import React from "react";
import Divider from "@material-ui/core/Divider";
import grey from "@material-ui/core/colors/grey";

interface HeavyDividerProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

const HeavyDivider = ({ className, orientation = "horizontal" }: HeavyDividerProps) => {
  return (
    <Divider
      className={className}
      orientation={orientation}
      variant="middle"
      flexItem
      style={{ backgroundColor: grey[700] }}
    />
  );
};

export default HeavyDivider;
