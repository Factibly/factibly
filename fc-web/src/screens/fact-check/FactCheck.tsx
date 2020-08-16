import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import PageContainer from "../../common/PageContainer";
import FactCheckOpenGraph from "./FactCheckOpenGraph";
import FactCheckHeader from "./FactCheckHeader";
import FactCheckCoverImage from "./FactCheckCoverImage";
import FactCheckOverview from "./overview/FactCheckOverview";
import FactCheckRatingCard from "./user-rating/FactCheckRatingCard";
import FactCheckRatingEditor from "./user-rating/FactCheckRatingEditor";
import FactCheckRatingsChart from "./trends/FactCheckRatingsChart";
import FactCheckRatings from "./user-rating/FactCheckRatings";
import { showFactCheckWidget } from "./widget/FactCheckWidget";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import { CONTENT, LOGGED_IN } from "../../gql/queries";
import history from "../../hooks/history";
import { RatingOrigin, RatingAction } from "../../static/enums";
import { ACCOUNT_SIGN_IN_PATH } from "../../static/paths";
import { Content, ContentVariables } from "../../gql/__generated__/Content";
import { LoggedIn } from "../../gql/__generated__/LoggedIn";
import { useCustomQuery } from "../../hooks/gql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      width: "100%",
      "& > *": {
        marginBottom: theme.spacing(6),
      },
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
      bottom: theme.spacing(1),
      left: `calc(50% - 120px - ${theme.spacing(1)}px)`,
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);

const FactCheck = () => {
  const { contentId } = useParams();
  const location = useLocation();
  const classes = useStyles();
  const intl = useIntl();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const { data: userData } = useCustomQuery<LoggedIn>(LOGGED_IN);
  const userLoggedIn = !!userData?.currentUser;

  const { loading: contentLoading, data: contentData } = useCustomQuery<Content, ContentVariables>(CONTENT, {
    variables: { contentId },
  });
  const content = contentData?.content;
  const selfRating = content?.userRating;
  const sourceTitle =
    content?.title || content?.author || intl.formatMessage({ id: "factCheck.openGraph.sourceTitle.default" });

  const [openRatingEditor, setOpenRatingEditor] = useState<boolean>(false);
  const handleOpenRatingEditor = () => {
    if (userLoggedIn) {
      setOpenRatingEditor(true);
    } else {
      history.replace({
        pathname: ACCOUNT_SIGN_IN_PATH,
        state: { from: location.pathname },
      });
    }
  };
  const handleCloseRatingEditor = () => setOpenRatingEditor(false);

  if (contentLoading) return <div />;

  const urlSearchParams = new URLSearchParams(location.search);
  if (parseInt(urlSearchParams.get("layout") ?? "0") === 1) {
    showFactCheckWidget(urlSearchParams, content, intl.locale);
    return null;
  }

  return (
    <PageContainer>
      <Helmet>
        <title>{`${intl.formatMessage({ id: "nav.drawer.item.factCheck" })}: ${sourceTitle}`}</title>
      </Helmet>
      <FactCheckOpenGraph
        key={`fc-og-${content?.title}`}
        titlePrefix={intl.formatMessage({ id: "factCheck.openGraph.titlePrefix" })}
        sourceTitle={sourceTitle}
        description={intl.formatMessage({ id: "factCheck.openGraph.description" })}
      />
      <Grid container direction="column">
        <FactCheckHeader sourceTitle={sourceTitle} author={content?.author} />
        <FactCheckCoverImage
          sourceTitle={sourceTitle}
          imageUrl={content?.imageUrl ?? null}
          imageModerationScore={content?.imageModerationScore ?? "A_0"}
        />
        <Grid item className={classes.content}>
          <section id="overview" aria-label={intl.formatMessage({ id: "factCheck.overview.title" })}>
            <FactCheckOverview content={content} userLoggedIn={userLoggedIn} />
          </section>
          <Grid container item direction="column" spacing={2}>
            <Grid item>
              <section id="self-rating" aria-label={intl.formatMessage({ id: "factCheck.userRatings.selfRating" })}>
                {selfRating ? (
                  <FactCheckRatingCard
                    displayName={intl.formatMessage({ id: "factCheck.userRatings.selfRating" })}
                    ratingId={selfRating.id}
                    contentId={contentId}
                    createdAt={selfRating.createdAt}
                    scores={[selfRating.score1, selfRating.score2, selfRating.score3]}
                    justification={selfRating.justification ?? ""}
                    upvoteCount={selfRating.upvoteCount}
                    downvoteCount={selfRating.downvoteCount}
                    elevation={3}
                    inheritBackground
                    origin={RatingOrigin.YOURS}
                    action={RatingAction.EDIT}
                    onRatingEditorOpen={handleOpenRatingEditor}
                  />
                ) : (
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={handleOpenRatingEditor}
                    disableElevation
                  >
                    {intl.formatMessage({
                      id: userLoggedIn
                        ? "factCheck.userRatings.action.rate.rateSource"
                        : "factCheck.userRatings.action.rate.logRate",
                    })}
                  </Button>
                )}
              </section>
            </Grid>
          </Grid>
          <FactCheckRatingEditor
            key={`rating-editor-${selfRating?.id}`}
            contentId={contentId}
            open={openRatingEditor}
            onClose={handleCloseRatingEditor}
            defaultScores={[selfRating?.score1 ?? 0, selfRating?.score2 ?? 0, selfRating?.score3 ?? 0]}
            defaultJustification={selfRating?.justification ?? ""}
            executeRecaptcha={executeRecaptcha}
          />
          <Grid container item direction="column" spacing={3}>
            <FactCheckRatingsChart
              ratings={content?.ratingSet ?? []}
              aria-label={intl.formatMessage({ id: "factCheck.trends.rating.title" })}
            />
            <Grid item>
              <section
                id="user-ratings"
                aria-label={intl.formatMessage({ id: "factCheck.userRatings.title" })}
                aria-live="polite"
              >
                <FactCheckRatings contentId={contentId} content={content} />
              </section>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default FactCheck;
