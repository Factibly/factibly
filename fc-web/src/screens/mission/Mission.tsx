import React, { useState, useLayoutEffect, useEffect } from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import ScrollMagic from "scrollmagic";
import { isBrowser } from "react-device-detect";
import CompanyIntroduction from "./CompanyIntroduction";
import CompanyTeam from "./CompanyTeam";
import CompanyTechStack from "./CompanyTechStack";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import "../../styles/smooth-scroll.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.common.black,
    },
    ped: {
      "& > div": {
        paddingBottom: theme.spacing(2),
      },
    },
  })
);

const Mission = () => {
  const classes = useStyles();
  const intl = useIntl();

  const [, setActiveWindowWidth] = useState<number>(window.innerWidth);

  useLayoutEffect(() => {
    if (isBrowser) {
      window.addEventListener("resize", () => {
        setActiveWindowWidth(window.innerWidth);
        window.location.reload(false);
      });
    }
  });

  useEffect(() => {
    // You'll need to refresh the page when changing between browser and non-browser modes
    if (isBrowser) {
      const controller: ScrollMagic.Controller = new ScrollMagic.Controller({
        globalSceneOptions: { triggerHook: "onLeave" },
      });
      ["#trigger1", "#trigger2", "#trigger3"].forEach(triggerElement => {
        new ScrollMagic.Scene({ triggerElement }).setPin(triggerElement).addTo(controller);
      });
    }
  });

  return (
    <div className={classes.root}>
      <Helmet>
        <title> {intl.formatMessage({ id: "nav.drawer.item.mission" })} </title>
      </Helmet>
      <section id="trigger1">
        <CompanyIntroduction />
      </section>
      <section id="trigger2">
        <CompanyTeam />
      </section>
      <section id="trigger3" className={classes.ped}>
        <CompanyTechStack />
      </section>
    </div>
  );
};

export default Mission;
