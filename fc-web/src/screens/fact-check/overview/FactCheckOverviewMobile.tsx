import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useIntl } from "react-intl";
import FactCheckScoreBar from "./FactCheckScoreBar";
import FactCheckHighlightCard from "./FactCheckHighlightCard";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  Link,
  Accordion,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faShare, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import ReactCountryFlag from "react-country-flag";
import { BOOKMARKS_PATH } from "../../../static/paths";

interface FactCheckOverviewMobileProps {
  content: any;
  userLoggedIn: boolean;
  onOpenShareMenu: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onOpenReferenceGenerator: () => void;
  onCreateBookmark: () => Promise<void>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    countryFlags: {
      "& > img": {
        margin: theme.spacing(0, 1),
        fontSize: theme.typography.pxToRem(32),
      },
    },
    buttons: {
      "& > *": {
        margin: theme.spacing(1, 0),
        textTransform: "none",
      },
    },
    button: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      color: theme.palette.text.primary,
      textTransform: "none",
    },
    accordionTop: {
      color: theme.palette.common.black,
    },
    overviewListPadding: {
      padding: 0,
    },
    highlightCard: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
);

const FactCheckOverviewMobile = ({
  content,
  userLoggedIn,
  onOpenShareMenu,
  onOpenReferenceGenerator,
  onCreateBookmark,
}: FactCheckOverviewMobileProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const [expandedAccordion, setExpandedAccordion] = useState<string | false>("panel1");
  const handleAccordionChange = (panel: string) => (_: React.ChangeEvent<{}>, isExpanded: boolean) =>
    setExpandedAccordion(isExpanded ? panel : false);

  const retrieveHighlights = () => {
    return content?.ratingSet
      ?.slice(0, 2)
      .map(({ user, createdAt, score1, score2, score3, justification, upvoteCount, downvoteCount }, i: number) => (
        <FactCheckHighlightCard
          key={`fact-checkout-overview-highlight-${i}`}
          className={classes.highlightCard}
          displayName={user.displayName}
          createdAt={createdAt}
          scores={[score1, score2, score3]}
          justification={justification}
          upvoteCount={upvoteCount}
          downvoteCount={downvoteCount}
          country={user.country}
        />
      ));
  };

  const bookmarked = content.isBookmarked || !userLoggedIn;

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <FactCheckScoreBar ratings={content?.ratingSet} overallScore={content?.overallScore} ratingFontSize={40} />
      </Grid>
      <Grid item className={classes.buttons}>
        <Button
          className={classes.button}
          variant="outlined"
          href={content?.url}
          target="_blank"
          rel="noreferrer noopener"
          startIcon={<FontAwesomeIcon icon={faExternalLinkAlt} />}
          fullWidth
        >
          {intl.formatMessage({ id: "factCheck.userRatings.action.visitSource" })}
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          startIcon={<FontAwesomeIcon icon={faShare} />}
          onClick={onOpenShareMenu}
          fullWidth
        >
          {intl.formatMessage({ id: "general.action.share" })}
        </Button>
        <Button
          className={classes.button}
          variant="outlined"
          startIcon={<FontAwesomeIcon icon={faQuoteLeft} />}
          onClick={onOpenReferenceGenerator}
          fullWidth
        >
          {intl.formatMessage({ id: "factCheck.cite.action" })}
        </Button>
        <Link
          className={classes.button}
          key={`fact-check-bookmarked--${bookmarked}`}
          component={bookmarked ? RouterLink : "button"}
          variant="button"
          onClick={bookmarked ? undefined : onCreateBookmark}
          to={bookmarked ? BOOKMARKS_PATH : ""}
          style={{ fontSize: "larger" }}
        >
          {intl.formatMessage({
            id:
              content.isBookmarked && userLoggedIn
                ? "factCheck.overview.action.bookmarked"
                : "factCheck.overview.action.bookmark",
          })}
        </Link>
      </Grid>
      <Grid item>
        <Accordion expanded={expandedAccordion === "panel1"} onChange={handleAccordionChange("panel1")}>
          <AccordionSummary
            id={`overview-panel1bh-header-${content?.id}`}
            className={classes.accordionTop}
            expandIcon={<ExpandMore className={classes.accordionTop} />}
            aria-controls={`overview-panel1bh-content-${content?.id}`}
          >
            <Typography>{intl.formatMessage({ id: "factCheck.overview" })}</Typography>
          </AccordionSummary>
          <List id={`overview-panel1bh-content-${content?.id}`} classes={{ padding: classes.overviewListPadding }}>
            {[
              {
                labelId: "factCheck.overview.lastUpdated.alt1",
                data: (
                  <time dateTime={content?.updatedAt}>
                    {intl.formatDate(content?.updatedAt, { dateStyle: "short", timeZoneName: "short" })}
                  </time>
                ),
              },
              {
                labelId: "factCheck.overview.view.count.alt1",
                data: intl.formatNumber(content?.searchCount ?? 0),
              },
              {
                labelId: "factCheck.overview.author.alt1",
                data: content?.author || intl.formatMessage({ id: "factCheck.overview.author.unknown" }),
              },
              {
                labelId: "factCheck.overview.type",
                data: "Articled Media",
              },
              {
                labelId: "factCheck.overview.popularCountries",
                data: (
                  <div className={classes.countryFlags}>
                    {["CA", "US", "GB"].map(countryCode => (
                      <ReactCountryFlag
                        key={`trending-country-${countryCode}`}
                        countryCode={countryCode}
                        svg
                        aria-label={countryCode}
                      />
                    ))}
                  </div>
                ),
              },
            ].map(({ labelId, data }) => (
              <ListItem key={`fact-check-overview-data-${labelId}`}>
                <ListItemText
                  primary={
                    <>
                      {intl.formatMessage({ id: labelId })}
                      <br />
                      <Typography component="div" color="textSecondary">
                        {data}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Accordion>
      </Grid>
      <Grid item>{retrieveHighlights()}</Grid>
    </Grid>
  );
};

export default FactCheckOverviewMobile;
