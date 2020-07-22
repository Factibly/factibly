import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import Flex from "../../common/Flex";
import FactCheckHighlightedRating from "./FactCheckHighlightedRating";
import ShareMenu from "./ShareMenu";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Button, IconButton, Snackbar, SnackbarContent, Link } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { Close } from "@material-ui/icons";
import { grey } from "@material-ui/core/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import ReactCountryFlag from "react-country-flag";

interface FactCheckOverviewProps {
  content: any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: ({ prefersDarkMode }: any) => ({
    padding: theme.spacing(2),
    backgroundColor: prefersDarkMode ? grey[800] : grey[200],
  }),
  overviewLeft: {
    "& > *": {
      padding: `${theme.spacing(1)}px 0`,
    },
  },
  overviewRight: {
    textAlign: "right",
    "& > *": {
      padding: `${theme.spacing(3)}px 0`,
    },
  },
  countryFlags: {
    "& > *": {
      margin: `0 ${theme.spacing(1)}px`,
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
      background: "black",
      content: "''",
    },
  },
  actionButtons: {
    padding: `0 ${theme.spacing(2)}px`,
  },
  button: {
    marginTop: theme.spacing(2),
    textTransform: "none",
    borderRadius: 24,
  },
  menuPaper: {
    minWidth: 320,
    border: `2px solid ${theme.palette.action.active}`,
  },
  copyEmbedButton: {
    padding: theme.spacing(1),
  },
  closeButton: {
    color: theme.palette.background.default,
  },
}));

const FactCheckOverview = ({ content }: FactCheckOverviewProps) => {
  const prefersDarkMode: boolean = useSelector((state: any) => state.screenReducers.prefersDarkMode);

  const classes = useStyles({ prefersDarkMode });
  const intl = useIntl();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openBookmarkSnackbar, setOpenBookmarkSnackbar] = useState<boolean>(false);

  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleCreateBookmark = () => {
    setOpenBookmarkSnackbar(true);
  };

  const handleCloseBookmarkSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") return;
    setOpenBookmarkSnackbar(false);
  };

  const formatRatingScore = (value: number) =>
    intl.formatNumber(value, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const ratingScoreText: string = intl.formatMessage(
    { id: "general.info.msg.outOf.content" },
    {
      actualValue: formatRatingScore(content?.overallScore ?? 0),
      maxValue: formatRatingScore(5.0),
    }
  );

  return (
    <Paper className={classes.root} elevation={0} square>
      <Grid container item direction="row">
        <Grid container item className={classes.overviewLeft} direction="column" xs={8} xl={4}>
          <Grid item>
            <div className="grid--first-column-shrink">
              <Typography variant="h3"> {ratingScoreText.substr(0, ratingScoreText.indexOf(" "))} </Typography>
              <div>
                <Typography variant="subtitle1" style={{ position: "relative", top: "10%", lineHeight: "normal" }}>
                  {ratingScoreText.substr(ratingScoreText.indexOf(" ") + 1)} <br />
                  {intl.formatMessage(
                    { id: "factCheck.overview.ratingCount.name" },
                    { ratingCount: content?.ratingSet?.length ?? 0 }
                  )}
                </Typography>
              </div>
            </div>
            <Rating defaultValue={content?.overallScore ?? 0} precision={0.1} style={{ fontSize: 56 }} readOnly />
          </Grid>
          <Grid item>
            <Typography variant="h6">
              {intl.formatMessage({ id: "factCheck.overview.popularCountries.name" })}
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
                  style={{ fontSize: 48 }}
                />
              ))}
            </Flex>
          </Grid>
          <ShareMenu anchorEl={anchorEl} closeMenu={closeMenu} />
        </Grid>
        <Grid container item className={classes.overviewRight} direction="column" xs={4}>
          <Grid item>
            <Typography variant="subtitle1" style={{ color: grey[600] }}>
              {intl.formatMessage(
                { id: "factCheck.overview.lastUpdated.name" },
                { date: "July 15, 2020", time: "11:22:37 EST" }
              )}
            </Typography>
            <div>
              <Link variant="h6" href={content?.url} target="_blank" rel="noreferrer noopener">
                {intl.formatMessage({ id: "factCheck.userRatings.action.visitSource.name" })}
              </Link>
            </div>
            <Typography className={classes.borderedCut} component="span" variant="h4">
              {intl.formatMessage(
                { id: "factCheck.overview.viewCount.name" },
                { viewCount: intl.formatNumber(content?.searchCount ?? 0) }
              )}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              {intl.formatMessage({ id: "factCheck.overview.author.name" }, { author: "CNN" })}
            </Typography>
            <Typography variant="h6"> Articled Media </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={5} style={{ padding: "16px 0px" }}>
          <Grid item xs={6}>
            <FactCheckHighlightedRating
              user="Pam Beesly Halpert"
              updatedAt={new Date()}
              content={`This article is mostly correct, despite it coming from a newspaper associated with a competitor of
              Dunder Mufflin. Dwight fell for another one of Jim's pranks... again. However, I would like to point out that
              Dwight was, at the time of writing, the Assistant to the Regional Manager, not the Assistant Regional Manager.
              This is according to our then-boss, Michael Scott, who left Scranton in 2011.`}
            />
          </Grid>
          <Grid item xs={6}>
            <FactCheckHighlightedRating
              user="Angela Schrute"
              updatedAt={new Date()}
              content={`This article is 100% correct. Ryan, the temp, accidentally burned the Dunder Mufflin Scantron
              building because he timed the toaster oven on oven mode rather than on toaster mode when he was reheating his
              cheese pita. Of course, Dwight and Michael sang a parody of Billy Joel's We Didn't Start the Fire to mock him.`}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.actionButtons}>
          <Button
            className={classes.button}
            variant="outlined"
            startIcon={<FontAwesomeIcon icon={faShare} />}
            onClick={openMenu}
            style={{ float: "left" }}
          >
            {intl.formatMessage({ id: "general.action.share.name" })}
          </Button>
          <Link
            className={classes.button}
            component="button"
            variant="subtitle1"
            onClick={handleCreateBookmark}
            style={{ marginLeft: "auto" }}
          >
            {intl.formatMessage({ id: "factCheck.overview.action.bookmark.name" })}
          </Link>
        </Grid>
        <Snackbar
          open={openBookmarkSnackbar}
          transitionDuration={500}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          onClose={handleCloseBookmarkSnackbar}
          disableWindowBlurListener
        >
          <SnackbarContent
            message={intl.formatMessage({ id: "factCheck.snackbar.bookmark.content" })}
            action={
              <>
                <Button color="secondary" size="small">
                  {intl.formatMessage({ id: "general.action.undo.name" })}
                </Button>
                <IconButton className={classes.closeButton} size="small" onClick={handleCloseBookmarkSnackbar}>
                  <Close />
                </IconButton>
              </>
            }
          />
        </Snackbar>
      </Grid>
    </Paper>
  );
};

export default FactCheckOverview;
