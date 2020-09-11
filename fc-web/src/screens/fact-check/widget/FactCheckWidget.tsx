import React from "react";
import { useIntl } from "react-intl";
import FactCheckScoreBar from "../overview/FactCheckScoreBar";
import FactCheckRatingBreakdown from "../user-rating/FactCheckRatingBreakdown";
import { makeStyles, createStyles, Theme, useTheme } from "@material-ui/core/styles";
import { Box, Typography, Paper, MobileStepper, Button, Link } from "@material-ui/core";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import iframePrts from "../../../static/data/fact-check-iframe-properties";
import { RatingOrigin } from "../../../static/enums";
import { formatAsDaysAgo } from "../../../utils/date-utils";
import { renderIframeElement } from "../../../extensions/iframe";

interface FactCheckWidgetProps {
  originUrl: string;
  content: any;
  maxRatings: number;
  width?: number | string;
  height?: number | string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: ({ width }: any) => width ?? theme.spacing(40),
      height: ({ height }: any) => height,
    },
    title: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      textAlign: "center",
      wordWrap: "break-word",
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
    },
    body: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(1),
    },
    subbody: {
      flexGrow: 1,
      width: "100%",
    },
    scoreWrapper: {
      paddingBottom: theme.spacing(1),
    },
    ratingHeader: {
      padding: theme.spacing(0.5, 2),
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
    },
    ratingContent: {
      padding: theme.spacing(1),
    },
    fullRatingText: {
      display: "block",
      margin: 0,
      paddingTop: theme.spacing(0.5),
    },
    stepper: {
      padding: 0,
    },
  })
);

export function showFactCheckWidget(urlSearchParams: URLSearchParams, content: any, fallbackLocale: string) {
  const locale = urlSearchParams.get(iframePrts.locale.property) ?? fallbackLocale;

  const maxRatings = parseInt(urlSearchParams.get(iframePrts.max.property) ?? "-1");

  const w = urlSearchParams.get(iframePrts.width.property) ?? undefined;
  const width = w && parseInt(w);
  const h = urlSearchParams.get(iframePrts.height.property) ?? undefined;
  const height = h && parseInt(h);

  renderIframeElement(
    locale,
    <FactCheckWidget
      content={content}
      maxRatings={maxRatings}
      originUrl={`${window.location.protocol}//${window.location.host}${window.location.pathname}`}
      width={width}
      height={height}
    />
  );
}

const FactCheckWidget = ({ originUrl, content, maxRatings, width, height }: FactCheckWidgetProps) => {
  const theme = useTheme();
  const classes = useStyles({ width, height });
  const intl = useIntl();

  const [activeRatingIndex, setActiveRatingIndex] = React.useState(0);
  const rating = content?.ratingSet[activeRatingIndex];
  const maxSteps = Math.min(content?.ratingSet?.length, Math.max(maxRatings, 0));

  const handleNext = () => {
    setActiveRatingIndex(prevActiveRatingIndex => prevActiveRatingIndex + 1);
  };

  const handleBack = () => {
    setActiveRatingIndex(prevActiveRatingIndex => prevActiveRatingIndex - 1);
  };

  return (
    <Box component="div" className={classes.root} border={1.5}>
      <Typography className={classes.title} variant="h5">
        {intl.formatMessage({ id: "nav.drawer.item.factCheck" })}
      </Typography>
      <div className={classes.body}>
        <div className={classes.scoreWrapper}>
          <FactCheckScoreBar ratings={content?.ratingSet} overallScore={content?.overallScore} />
          <Button variant="contained" color="primary" size="small" href={originUrl} fullWidth disableElevation>
            {intl.formatMessage({ id: "factCheck.widget.action.readComplete" })}
          </Button>
        </div>
        {maxSteps > 0 && (
          <Box component="div" className={classes.subbody} border={1}>
            <Paper square className={classes.ratingHeader} elevation={0}>
              <strong>{intl.formatMessage({ id: "factCheck.widget.ratings" })}</strong> <br />
              {rating?.user?.displayName} &mdash;{" "}
              {formatAsDaysAgo(
                rating?.createdAt,
                daysAgo => intl.formatMessage({ id: "general.unit.daysAgo" }, { daysAgo }),
                date => intl.formatDate(date, { year: "numeric", month: "long", day: "numeric" })
              )}
            </Paper>
            <div className={classes.ratingContent}>
              <FactCheckRatingBreakdown
                displayName={rating?.user?.displayName}
                scores={[rating?.score1, rating?.score2, rating?.score3]}
                origin={RatingOrigin.THEIRS}
                style={{ float: "left" }}
              />
              <Link className={classes.fullRatingText} href={originUrl} style={{ clear: "both" }}>
                {intl.formatMessage({ id: "factCheck.widget.ratings.seeFull" })}
              </Link>
            </div>
            <MobileStepper
              className={classes.stepper}
              steps={maxSteps}
              position="static"
              variant="text"
              activeStep={activeRatingIndex}
              nextButton={
                <Button size="small" onClick={handleNext} disabled={activeRatingIndex === maxSteps - 1}>
                  {intl.formatMessage({ id: "general.action.next" })}
                  {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeRatingIndex === 0}>
                  {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  {intl.formatMessage({ id: "general.action.back" })}
                </Button>
              }
            />
          </Box>
        )}
      </div>
    </Box>
  );
};

export default FactCheckWidget;
