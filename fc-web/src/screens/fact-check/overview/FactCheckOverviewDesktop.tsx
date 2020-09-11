import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useIntl } from "react-intl";
import Flex from "../../../common/Flex";
import IconicText from "../../../common/IconicText";
import FactCheckScoreBar from "./FactCheckScoreBar";
import FactCheckHighlightCard from "./FactCheckHighlightCard";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography, Button, Link } from "@material-ui/core";
import BookIcon from "@material-ui/icons/Book";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faShare, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import ReactCountryFlag from "react-country-flag";
import { BOOKMARKS_PATH } from "../../../static/paths";
interface FactCheckOverviewDesktopProps {
  content: any;
  userLoggedIn: boolean;
  onOpenShareMenu: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onOpenReferenceGenerator: () => void;
  onCreateBookmark: () => Promise<void>;
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
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      "& > img": {
        margin: theme.spacing(0, 1),
        fontSize: theme.typography.pxToRem(48),
      },
    },
    borderedCut: {
      position: "relative",
      "&::after": {
        position: "absolute",
        bottom: 0,
        left: "10%",
        right: "10%",
        width: "85%",
        height: 1.5,
        background: theme.palette.text.primary,
        content: "''",
      },
    },
    highlights: {
      padding: theme.spacing(2, 0),
    },
    highlightCard: {
      height: "100%",
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
      color: theme.palette.text.primary,
      textTransform: "none",
      borderRadius: theme.spacing(3),
    },
  })
);

const FactCheckOverviewDesktop = ({
  content,
  userLoggedIn,
  onOpenShareMenu,
  onOpenReferenceGenerator,
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
            className={classes.highlightCard}
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

  const bookmarked = content.isBookmarked || !userLoggedIn;

  return (
    <Grid container item direction="row">
      <Grid container item className={classes.overviewLeft} direction="column" xs={8} xl={4}>
        <Grid item>
          <FactCheckScoreBar ratings={content?.ratingSet} overallScore={content?.overallScore} />
        </Grid>
        <Grid item>
          <Typography style={{ fontSize: "large" }}>
            {intl.formatMessage({ id: "factCheck.overview.popularCountries" })}
          </Typography>
          <Flex className={classes.countryFlags}>
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
          <Typography component="div" style={{ fontSize: "large" }}>
            <IconicText
              id="source-type--articled-media"
              text="Articled Media"
              icon={<BookIcon />}
              style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}
            />
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
          <Button
            className={classes.button}
            variant="outlined"
            startIcon={<FontAwesomeIcon icon={faQuoteLeft} />}
            onClick={onOpenReferenceGenerator}
          >
            {intl.formatMessage({ id: "factCheck.cite.action" })}
          </Button>
        </div>
        <Link
          key={`fact-check-bookmarked--${bookmarked}`}
          className={classes.button}
          component={bookmarked ? RouterLink : "button"}
          variant="button"
          onClick={bookmarked ? undefined : onCreateBookmark}
          to={bookmarked ? BOOKMARKS_PATH : ""}
          style={{ marginLeft: "auto", fontSize: "large" }}
        >
          {intl.formatMessage({
            id:
              content.isBookmarked && userLoggedIn
                ? "factCheck.overview.action.bookmarked"
                : "factCheck.overview.action.bookmark",
          })}
        </Link>
      </Grid>
    </Grid>
  );
};

export default FactCheckOverviewDesktop;
