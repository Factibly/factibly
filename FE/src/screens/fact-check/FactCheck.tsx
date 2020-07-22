import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import FactCheckOpenGraph from "./FactCheckOpenGraph";
import FactCheckOverview from "./FactCheckOverview";
import UserRating, { RatingAction } from "./UserRating";
import RatingsChart from "./RatingsChart";
import RatingEditor from "./RatingEditor";
import BootstrapInput from "../../common/BootstrapInput";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography, FormControl, Select, MenuItem, Button } from "@material-ui/core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/client";
import { CONTENT } from "../../gql/queries";
import { isLoggedIn } from "../../utils/user-utils";
import history from "../../hooks/history";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexDirection: "column",
      margin: "auto",
      padding: `${theme.spacing(3)}px ${theme.spacing(27)}px`,
      [theme.breakpoints.only("xs")]: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
      },
      [theme.breakpoints.only("sm")]: {
        paddingLeft: theme.spacing(9),
        paddingRight: theme.spacing(9),
      },
      [theme.breakpoints.only("md")]: {
        paddingLeft: theme.spacing(15),
        paddingRight: theme.spacing(15),
      },
      [theme.breakpoints.only("lg")]: {
        paddingLeft: theme.spacing(21),
        paddingRight: theme.spacing(21),
      },
    },
    coverImage: {
      height: "50vh",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      marginBottom: theme.spacing(2),
    },
    tag: {
      alignSelf: "flex-start",
      padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
      color: theme.palette.secondary.main,
      border: `thin solid ${theme.palette.secondary.main}`,
      borderRadius: 16,
    },
    title: {
      textAlign: "left",
      wordWrap: "break-word",
      hyphens: "auto",
      WebkitHyphens: "auto",
      msHyphens: "auto",
    },
    content: {
      width: "100%",
      "& > *": {
        marginBottom: theme.spacing(6),
      },
    },
    urlOutline: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    button: {
      marginTop: theme.spacing(2),
      borderRadius: 24,
    },
    fab: {
      position: "fixed",
      width: 240,
      margin: 0,
      top: "auto",
      right: 0,
      bottom: 8,
      left: "calc(50% - 120px - 8px)",
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    ratings: {
      "& > *": {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      },
    },
  })
);

const sortingTypes = Object.freeze(["factCheck.userRatings.action.sort.mostRecent.name"]);

const FactCheck = () => {
  const { contentId } = useParams();
  const classes = useStyles();
  const intl = useIntl();

  const [openCreateRating, setOpenCreateRating] = useState<boolean>(false);
  const [sortingTypeIndex, setSortingTypeIndex] = useState<number>(0);

  const handleSortingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortingTypeIndex(event.target.value as number);
  };

  const handleClickOpenCreateRating = () => {
    setOpenCreateRating(true);
  };

  const handleCloseCreateRating = () => {
    setOpenCreateRating(false);
  };

  // const { data: userData } = useQuery(CURRENT_USER);
  const { loading: contentLoading, data: contentData } = useQuery(CONTENT, {
    variables: { contentId },
  });

  // const userId = userData?.currentUser?.id;
  const content = contentData?.content;
  const selfRating = content?.userRating;

  if (contentLoading) return <div />;

  return (
    <>
      <FactCheckOpenGraph
        key={`fc-og-${content?.title}`}
        sourceTitle={content?.title || content?.author || "Crowd-Sourced Rating"}
      />
      <Grid container className={classes.root} direction="column">
        <Typography className={classes.tag} gutterBottom>
          {intl.formatMessage({ id: "factCheck.factCheckCertified.tag.name" })}
        </Typography>
        <Typography className={classes.title} gutterBottom variant="h3">
          {content?.title}
        </Typography>
        {content?.imageUrl && (
          <Grid item className={classes.coverImage} style={{ backgroundImage: `url(${content?.imageUrl})` }} />
        )}
        <Grid item className={classes.content} spacing={3}>
          <FactCheckOverview content={content} />
          <Grid container item direction="column" spacing={2}>
            <Grid item>
              {selfRating ? (
                <UserRating
                  user={intl.formatMessage({ id: "factCheck.userRatings.selfRating.name" })}
                  contentId={contentId}
                  ratingId={selfRating.id}
                  createdAt={selfRating.createdAt}
                  scores={[selfRating.score1, selfRating.score2, selfRating.score3]}
                  justification={selfRating.justification}
                  upvoteCount={selfRating.upvoteCount}
                  downvoteCount={selfRating.downvoteCount}
                  elevation={3}
                  inheritBackground
                  ratingAction={RatingAction.Edit}
                  onRatingEditorOpen={handleClickOpenCreateRating}
                />
              ) : (
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={() => (isLoggedIn() ? handleClickOpenCreateRating() : history.push("/account/sign-in"))}
                  disableElevation
                >
                  {isLoggedIn() ? "Rate This Source" : "Sign In And Rate"}
                </Button>
              )}
            </Grid>
          </Grid>
          <RatingEditor
            key={`self-rating-${selfRating?.id}`}
            contentId={contentId}
            open={openCreateRating}
            handleClose={handleCloseCreateRating}
            defaultScores={[selfRating?.score1, selfRating?.score2, selfRating?.score3]}
            defaultJustification={selfRating?.justification}
          />
          <Grid container item direction="column" spacing={3}>
            <RatingsChart ratings={content?.ratingSet} />
            <Grid item>
              <FormControl variant="filled">
                <Select value={sortingTypeIndex} onChange={handleSortingChange} input={<BootstrapInput />}>
                  {sortingTypes.map((id, index) => (
                    <MenuItem key={`sort-justification-${index}`} value={index}>
                      {intl.formatMessage({ id })}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item className={classes.ratings}>
              {content?.ratingSet?.map((rating: any, index: number) => (
                <UserRating
                  key={`rating-${index}`}
                  ratingId={rating.id}
                  contentId={contentId}
                  user={rating.user.displayName}
                  createdAt={rating.createdAt}
                  scores={[rating.score1, rating.score2, rating.score3]}
                  justification={rating.justification}
                  country={rating.user.country}
                  upvoteCount={rating.upvoteCount}
                  downvoteCount={rating.downvoteCount}
                  ratingAction={RatingAction.Vote}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* {!selfRating && (
        <Fab
          className={classes.fab}
          variant="extended"
          color="secondary"
          size="large"
          onClick={() => (isLoggedIn() ? handleClickOpenCreateRating() : history.push("/account/sign-in"))}
          aria-label="rate this source"
        >
          <FontAwesomeIcon className={classes.extendedIcon} icon={faStarHalfAlt} />
          {intl.formatMessage({
            id: isLoggedIn()
              ? "factCheck.userRatings.action.rate.rateSource.name"
              : "factCheck.userRatings.action.rate.logRate.name",
          })}
        </Fab>
      )} */}
    </>
  );
};

export default FactCheck;
