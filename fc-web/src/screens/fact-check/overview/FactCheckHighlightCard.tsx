import React from "react";
import { useIntl } from "react-intl";
import FlatPaper from "../../../common/FlatPaper";
import FactCheckRatingHeader from "../user-rating/FactCheckRatingHeader";
import FactCheckRatingBreakdown from "../user-rating/FactCheckRatingBreakdown";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Card, CardContent, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { RatingOrigin } from "../../../static/enums";
import { findMean } from "../../../utils/number-utils";
import clsx from "clsx";
interface FactCheckHighlightCardProps {
  className?: string;
  displayName: string;
  createdAt: Date;
  scores: number[];
  justification: string;
  upvoteCount: number;
  downvoteCount: number;
  country?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
      padding: theme.spacing(1, 1, 3),
      borderRadius: theme.spacing(2),
      borderWidth: 2,
    },
    contentRoot: {
      paddingTop: 1,
      paddingBottom: 1,
      "&:last-child": {
        paddingBottom: 0,
      },
    },
    countryFlag: {
      fontSize: theme.typography.pxToRem(32),
    },
    filler: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

const FactCheckHighlightCard = ({
  className,
  displayName,
  createdAt,
  scores,
  justification,
  upvoteCount,
  downvoteCount,
  country,
}: FactCheckHighlightCardProps) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <FlatPaper
      rootComponent={Card}
      className={clsx(classes.root, className)}
      variant="outlined"
      elevation={0}
      inheritBackground
    >
      <div>
        <FactCheckRatingHeader displayName={displayName} createdAt={createdAt} country={country} />
        <CardContent classes={{ root: classes.contentRoot }}>
          <Rating
            size="large"
            value={findMean(scores)}
            precision={0.1}
            readOnly
            aria-label={intl.formatMessage({ id: "factCheck.userRatings.rating.aria" })}
          />
          <Typography component="p" variant="body2">
            {justification}
          </Typography>
        </CardContent>
      </div>
      <div className={classes.filler} />
      <CardContent classes={{ root: classes.contentRoot }}>
        <FactCheckRatingBreakdown
          displayName={displayName}
          scores={scores}
          origin={RatingOrigin.HIGHLIGHTED}
          style={{ float: "left" }}
        />
        <Typography component="div" variant="body2" style={{ float: "right" }}>
          {intl.formatMessage(
            { id: "factCheck.userRatings.upvoteCount" },
            { upvoteCount: intl.formatNumber(upvoteCount) }
          )}
          <br />
          {intl.formatMessage(
            { id: "factCheck.userRatings.downvoteCount" },
            { downvoteCount: intl.formatNumber(Math.abs(downvoteCount)) }
          )}
        </Typography>
      </CardContent>
    </FlatPaper>
  );
};

export default FactCheckHighlightCard;
