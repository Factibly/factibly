import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { SortableElement } from "react-sortable-hoc";
import { useMutation, useQuery } from "@apollo/client";
import { SEARCH_CONTENT } from "../gql/mutations";
import { CONTENT } from "../gql/queries";
import FactCheckModal from "./FactCheckModal";

const cardHeight = 380;
const coverImageHeight = 140;
const useStyles = makeStyles(theme => ({
  progressWrapper: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    height: 60,
    lineHeight: "normal",
    marginBottom: theme.spacing(2),
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  overview: {
    marginBottom: theme.spacing(1),
    lineHeight: 1.6,
  },
}));

const FactCheckCard = SortableElement(({ boardId, boardItemId, url, showImage }) => {
  const classes = useStyles();
  const intl = useIntl();

  const [openFactCheckModal, setOpenFactCheckModal] = useState(false);
  const handleOpenFactCheckModal = () => setOpenFactCheckModal(true);
  const handleCloseFactCheckModal = () => setOpenFactCheckModal(false);

  const [contentId, setContentId] = useState(undefined);
  const [searchMutation] = useMutation(SEARCH_CONTENT);

  const { loading: contentLoading, data: contentData } = useQuery(CONTENT, {
    variables: { contentId },
    skip: contentId === null || contentId === undefined,
  });
  const title = contentData?.content?.title;
  const author = contentData?.content?.author;
  const imageUrl = contentData?.content?.imageUrl;
  const overallScore = contentData?.content?.overallScore;
  const ratingCount = contentData?.content?.ratingSet.length ?? 0;
  const type = contentData?.content?.type;

  useEffect(() => {
    const retrieveFactCheckPromise = async () => await searchMutation({ variables: { input: { url } } });
    retrieveFactCheckPromise().then(res => setContentId(res?.data?.searchContent?.content?.id));
  }, [searchMutation, url]);

  const UnknownProperty = <em> {intl.formatMessage({ id: "factCheck.overview.author.unknown" })} </em>;

  return (
    <>
      <Grid item id={`fact-check-card-${boardItemId}`} xs={12} sm={4} md={3} tabIndex={0}>
        <Card
          className="factCheckCardCard"
          onClick={handleOpenFactCheckModal}
          style={{ height: showImage ? cardHeight : cardHeight - coverImageHeight, cursor: "pointer" }}
          aria-describedby={contentLoading ? "fact-check-card-progress" : undefined}
          aria-busy={contentLoading.toString()}
        >
          {contentLoading ? (
            <div className={classes.progressWrapper}>
              <CircularProgress id="fact-check-card-progress" />
            </div>
          ) : (
            <>
              {showImage && <CardMedia image={imageUrl} title={title} style={{ height: coverImageHeight }} />}
              <CardContent>
                <Typography className={classes.title} component="h2" variant="subtitle1" gutterBottom>
                  {title}
                </Typography>
                {overallScore ? (
                  <Rating
                    value={overallScore}
                    precision={0.1}
                    size="large"
                    readOnly
                    aria-label={intl.formatMessage({ id: "factCheck.overview.rating.aria" })}
                  />
                ) : (
                  <Typography component="p" variant="subtitle1">
                    {intl.formatMessage({ id: "factCheck.overview.rating.none" })}
                  </Typography>
                )}
                <Typography className={classes.overview} component="p" variant="body2" color="textSecondary">
                  {intl.formatMessage({ id: "factCheck.overview.rating.count" })}: {intl.formatNumber(ratingCount)}
                  <br />
                  {intl.formatMessage({ id: "factCheck.overview.source.author" })}: {author || UnknownProperty}
                  <br />
                  {intl.formatMessage({ id: "factCheck.overview.source.type" })}: {type || UnknownProperty}
                </Typography>
              </CardContent>
            </>
          )}
        </Card>
      </Grid>
      <FactCheckModal
        contentId={contentId}
        boardId={boardId}
        boardItemId={boardItemId}
        open={openFactCheckModal}
        onClose={handleCloseFactCheckModal}
      />
    </>
  );
});

export default FactCheckCard;
