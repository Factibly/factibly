import React, { PureComponent } from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import anime from "animejs/lib/anime.es.js";

interface BounceArrowProps {
  id: string;
  translateX: number;
  translateY: number;
  rotateDeg: number;
  style?: React.CSSProperties;
}

interface BounceArrowState {
  play: boolean;
}

class BounceArrow extends PureComponent<BounceArrowProps, BounceArrowState> {
  timeline: any;

  constructor(props: BounceArrowProps) {
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
        targets: "#" + this.props.id,
        translateX: this.props.translateX,
        translateY: this.props.translateY,
      },
      80
    );
  }

  render() {
    return (
      <div id={this.props.id} style={{ margin: "0 auto", ...this.props.style }}>
        <KeyboardArrowDownIcon fontSize="large" style={{ transform: `rotate(${this.props.rotateDeg}deg)` }} />
      </div>
    );
  }
}

export default BounceArrow;
