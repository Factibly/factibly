import React, { useState } from "react";
import { useIntl } from "react-intl";
import { makeStyles, createStyles, useTheme, Theme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Grid, Paper, Typography, IconButton, Button } from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import talkingPoints from "../../static/data/talking-points";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridContainer: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      "& > $gridItem": {
        position: "relative",
        "& button": {
          position: "absolute",
          height: "100%",
          borderRadius: 0,
        },
      },
    },
    gridItem: {},
    paper: {
      padding: theme.spacing(2),
    },
    iframe: {
      height: 512,
      width: "100%",
    },
  })
);

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const maxTps = talkingPoints.length;

const FactiblyIntroductoryPanel = () => {
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const classes = useStyles();
  const theme = useTheme();
  const intl = useIntl();

  const [activeTp, setActiveTp] = useState(0);
  const handleNextTp = () => setActiveTp(prevActiveTp => (prevActiveTp === maxTps - 1 ? 0 : prevActiveTp + 1));
  const handleBackTp = () => setActiveTp(prevActiveTp => (prevActiveTp === 0 ? maxTps - 1 : prevActiveTp - 1));
  const handleTpChange = (tpIdx: number) => setActiveTp(tpIdx);

  return (
    <section id="factibly-intro">
      <Typography component="h2" variant="h3" color="primary" gutterBottom align="center">
        Our mission is to give people the power to fight the infodemic and voice the truth
      </Typography>
      <Typography variant="body1" paragraph>
        We live in an era that has made it possible to spread information at such a high rate that is almost
        instantaneous. This drastic improvement in technology in recent decades has given almost everyone access to a
        vast amount of information. Although this has increased our access to knowledge, misinformation contaminates the
        World Wide Web, eroding our trust in factual and credible news sources.
      </Typography>
      <Typography variant="body1" paragraph>
        Founded in 2020, Factibly was inspired by the current socio-political climate around the world which has enabled
        fake news to spread like wildfire.
      </Typography>
      <Grid className={classes.gridContainer} container>
        <Grid item className={classes.gridItem} xs={1} lg={2}>
          <IconButton
            onClick={handleBackTp}
            style={{ right: 0 }}
            aria-label={intl.formatMessage({ id: "general.action.carousel.previous.aria" })}
          >
            <KeyboardArrowLeftIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item component={Paper} className={classes.paper} xs={10} lg={8} square>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeTp}
            onChangeIndex={handleTpChange}
            animateTransitions={!prefersReducedMotion}
            enableMouseEvents
          >
            {talkingPoints.map((talkingPoint, index) => (
              <Typography
                key={`mission-talking-point-${index}`}
                variant="subtitle1"
                color="textSecondary"
                style={{ fontSize: "large" }}
              >
                {talkingPoint}
              </Typography>
            ))}
          </AutoPlaySwipeableViews>
        </Grid>
        <Grid item className={classes.gridItem} xs={1} lg={2}>
          <IconButton
            onClick={handleNextTp}
            aria-label={intl.formatMessage({ id: "general.action.carousel.next.aria" })}
          >
            <KeyboardArrowRightIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      <iframe
        className={classes.iframe}
        title={intl.formatMessage({ id: "mission.intro.promo" })}
        src="https://www.youtube.com/embed/0xrTJyUZNGs"
        frameBorder="0"
        allowFullScreen
      />
      <Button href="/captions/factibly-promo-caption.txt" startIcon={<CloudDownloadIcon />} download>
        {intl.formatMessage({ id: "general.action.captions.download" })}
      </Button>
    </section>
  );
};

export default React.memo(FactiblyIntroductoryPanel);
