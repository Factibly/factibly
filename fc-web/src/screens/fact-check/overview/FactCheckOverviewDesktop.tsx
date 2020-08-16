import React from "react";
import { useIntl } from "react-intl";
import Flex from "../../../common/Flex";
import FactCheckScoreBar from "./FactCheckScoreBar";
import FactCheckHighlightCard from "./FactCheckHighlightCard";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography, Button, Link } from "@material-ui/core";
import BookIcon from "@material-ui/icons/Book";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faShare } from "@fortawesome/free-solid-svg-icons";
import ReactCountryFlag from "react-country-flag";
import { BOOKMARKS_PATH } from "../../../static/paths";
interface FactCheckOverviewDesktopProps {
  content: any;
  userLoggedIn: boolean;
  onOpenShareMenu: any;
  onCreateBookmark: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    overviewLeft: {
      "& > *": {
        padding: theme.spacing(1, 0),
      },
    },
    overviewRight: {
      textAlign: "right",
      "& > *": {
        padding: theme.spacing(3, 0),
      },
    },
    countryFlags: {
      "& > img": {
        margin: theme.spacing(0, 1),
        fontSize: theme.typography.pxToRem(48),
      },
    },
    borderedCut: ({ prefersDarkMode }: any) => ({
      position: "relative",
      "&::after": {
        position: "absolute",
        bottom: 0,
        left: "10%",
        right: "10%",
        width: "85%",
        height: 1.5,
        background: prefersDarkMode ? "white" : "black",
        content: "''",
      },
    }),
    highlights: {
      padding: theme.spacing(2, 0),
    },
    bottomRow: {
      padding: theme.spacing(0, 2),
      marginTop: theme.spacing(2),
    },
    buttonGroup: {
      "& > *": {
        marginRight: theme.spacing(2),
      },
    },
    button: {
      textTransform: "none",
      borderRadius: 24,
    },
  })
);

const FactCheckOverviewDesktop = ({
  content,
  userLoggedIn,
  onOpenShareMenu,
  onCreateBookmark,
}: FactCheckOverviewDesktopProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const retrieveHighlights = () => {
    const widthDistribution = Math.max(6, 12 / (content?.ratingSet?.length ?? 1)) as 6 | 12;
    return content?.ratingSet
      ?.slice(0, 2)
      .map(({ user, createdAt, score1, score2, score3, justification, upvoteCount, downvoteCount }, i: number) => (
        <Grid item key={`fact-checkout-overview-highlight-${i}`} xs={widthDistribution}>
          <FactCheckHighlightCard
            displayName={user.displayName}
            createdAt={createdAt}
            scores={[score1, score2, score3]}
            justification={justification}
            upvoteCount={upvoteCount}
            downvoteCount={downvoteCount}
            country={user.country}
          />
        </Grid>
      ));
  };

  return (
    <Grid container item direction="row">
      <Grid container item className={classes.overviewLeft} direction="column" xs={8} xl={4}>
        <Grid item>
          <FactCheckScoreBar ratingSet={content?.ratingSet} overallScore={content?.overallScore} />
        </Grid>
        <Grid item>
          <Typography style={{ fontSize: "large" }}>
            {intl.formatMessage({ id: "factCheck.overview.popularCountries" })}
          </Typography>
          <Flex
            className={classes.countryFlags}
            style={{ flex: 1, flexDirection: "row", justifyContent: "flex-start" }}
          >
            {["CA", "US", "GB"].map(countryCode => (
              <ReactCountryFlag
                key={`trending-country-${countryCode}`}
                countryCode={countryCode}
                svg
                aria-label={countryCode}
              />
            ))}
          </Flex>
        </Grid>
      </Grid>
      <Grid container item className={classes.overviewRight} direction="column" xs={4}>
        <Grid item>
          <Typography>
            <time dateTime={content?.updatedAt}>
              {intl.formatMessage(
                { id: "factCheck.overview.lastUpdated" },
                {
                  date: intl.formatDate(content?.updatedAt, { year: "numeric", month: "long", day: "numeric" }),
                  time: intl.formatDate(content?.updatedAt, {
                    hour: "numeric",
                    hour12: true,
                    minute: "numeric",
                    timeZoneName: "short",
                  }),
                }
              )}
            </time>
          </Typography>
          <Typography className={classes.borderedCut} component="span" style={{ fontSize: "xx-large" }}>
            {intl.formatMessage(
              { id: "factCheck.overview.view.count" },
              { viewCount: intl.formatNumber(content?.searchCount ?? 0) }
            )}
          </Typography>
        </Grid>
        <Grid item>
          <Typography style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", fontSize: "large" }}>
            <BookIcon />
            &nbsp;&nbsp;Articled Media
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.highlights} direction="row" spacing={5}>
        {retrieveHighlights()}
      </Grid>
      <Grid container className={classes.bottomRow}>
        <div className={classes.buttonGroup} style={{ marginRight: "auto" }}>
          <Button
            className={classes.button}
            variant="outlined"
            href={content?.url}
            target="_blank"
            rel="noreferrer noopener"
            startIcon={<FontAwesomeIcon icon={faExternalLinkAlt} />}
          >
            {intl.formatMessage({ id: "factCheck.userRatings.action.visitSource" })}
          </Button>
          <Button
            className={classes.button}
            variant="outlined"
            startIcon={<FontAwesomeIcon icon={faShare} />}
            onClick={onOpenShareMenu}
          >
            {intl.formatMessage({ id: "general.action.share" })}
          </Button>
        </div>
        {userLoggedIn && (
          <Link
            key={`fact-check-bookmarked-${content.isBookmarked}`}
            className={classes.button}
            component={content.isBookmarked ? "a" : "button"}
            variant="button"
            onClick={content.isBookmarked ? undefined : onCreateBookmark}
            href={content.isBookmarked ? BOOKMARKS_PATH : ""}
            style={{ marginLeft: "auto", fontSize: "large" }}
          >
            {content.isBookmarked
              ? intl.formatMessage({ id: "factCheck.overview.action.bookmarked" })
              : intl.formatMessage({ id: "factCheck.overview.action.bookmark" })}
          </Link>
        )}
      </Grid>
    </Grid>
  );
};

export default FactCheckOverviewDesktop;
