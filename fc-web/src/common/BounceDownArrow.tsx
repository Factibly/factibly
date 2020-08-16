import React, { PureComponent } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import anime from "animejs/lib/anime.es.js";

interface BounceDownArrowProps {
  arrowStyling?: object;
}

interface BounceDownArrowState {
  play: boolean;
}

class BounceDownArrow extends PureComponent<BounceDownArrowProps, BounceDownArrowState> {
  timeline: any;

  constructor(props: BounceDownArrowProps) {
    super(props);
    this.timeline = anime.timeline({
      easing: "cubicBezier(.5, .5, .5, .5)",
      direction: "alternate",
      loop: true,
      duration: 350,
    });
  }

  componentDidMount() {
    this.timeline.add(
      {
        targets: ".bouncy-down-arrow",
        translateY: -16,
      },
      80
    );
  }

  render() {
    return (
      <div className="bouncy-down-arrow" style={{ position: "fixed", width: "100%" }}>
        <KeyboardArrowDownIcon
          style={{ width: "100%", margin: "0 auto", fontSize: 88, color: "#FFF", ...this.props.arrowStyling }}
        />
      </div>
    );
  }
}

export default BounceDownArrow;
