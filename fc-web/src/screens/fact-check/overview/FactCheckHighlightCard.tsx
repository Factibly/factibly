import React from "react";
import { useIntl } from "react-intl";
import FlatPaper from "../../../common/FlatPaper";
import FactCheckRatingHeader from "../user-rating/FactCheckRatingHeader";
import FactCheckRatingBreakdown from "../user-rating/FactCheckRatingBreakdown";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Card, CardContent } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
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
      padding: theme.spacing(1, 1, 3),
      borderRadius: theme.spacing(2),
      borderWidth: 2,
    },
    content: {
      paddingTop: 0,
      "& > div:not(:last-child)": {
        paddingBottom: theme.spacing(2),
      },
    },
    countryFlag: {
      fontSize: theme.typography.pxToRem(32),
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
      <FactCheckRatingHeader displayName={displayName} createdAt={createdAt} country={country} />
      <CardContent className={classes.content}>
        <Rating
          size="large"
          value={findMean(scores)}
          precision={0.1}
          readOnly
          aria-label={intl.formatMessage({ id: "factCheck.userRatings.rating.aria" })}
        />
        <div>{justification}</div>
        <div>
          <FactCheckRatingBreakdown
            displayName={displayName}
            scores={scores}
            origin={RatingOrigin.HIGHLIGHTED}
            style={{ float: "left" }}
          />
          <div style={{ float: "right" }}>
            {intl.formatMessage(
              { id: "factCheck.userRatings.upvoteCount" },
              { upvoteCount: intl.formatNumber(upvoteCount) }
            )}
            <br />
            {intl.formatMessage(
              { id: "factCheck.userRatings.downvoteCount" },
              { downvoteCount: intl.formatNumber(Math.abs(downvoteCount)) }
            )}
          </div>
        </div>
      </CardContent>
    </FlatPaper>
  );
};

export default FactCheckHighlightCard;
