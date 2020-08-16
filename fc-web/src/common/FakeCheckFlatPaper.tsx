import React from "react";
import { Paper, PaperProps, Card } from "@material-ui/core";
import { DARK_GREY, LIGHT_GREY } from "../styles/colours";

interface FakeCheckFlatPaperProps extends PaperProps {
  rootComponent?: typeof Paper | typeof Card;
  inheritBackground?: boolean;
  prefersDarkMode?: boolean;
}

const FakeCheckFlatPaper = ({
  rootComponent: RootComponent = Paper,
  className,
  elevation = 0,
  inheritBackground = false,
  prefersDarkMode = false,
  children,
  style,
  ...otherProps
}: FakeCheckFlatPaperProps) => {
  return (
    <RootComponent
      className={className}
      elevation={elevation}
      style={{ ...style, backgroundColor: inheritBackground ? "inherit" : prefersDarkMode ? DARK_GREY : LIGHT_GREY }}
      {...otherProps}
    >
      {children}
    </RootComponent>
  );
};

export default FakeCheckFlatPaper;
