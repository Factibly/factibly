import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { useIntl } from "react-intl";
import FlatPaper from "../../../common/FlatPaper";
import FactCheckRatingHeader from "./FactCheckRatingHeader";
import FactCheckRatingBreakdown from "./FactCheckRatingBreakdown";
import FactCheckRatingActions from "./FactCheckRatingActions";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography, Card, CardContent, CardActions, Popover } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import { RatingOrigin, RatingAction } from "../../../static/enums";
import { findMean } from "../../../utils/number-utils";
import clsx from "clsx";

interface FactCheckRatingCardProps {
  className?: string;
  userLoggedIn: boolean;
  contentId: string;
  rating: any;
  displayName: string;
  country?: string;
  elevation?: number;
  disableAvatar?: boolean;
  origin: RatingOrigin;
  action: RatingAction;
  onRatingEditorOpen?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "left",
    },
    content: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    ratingWrapper: {
      width: "fit-content",
    },
    actions: {
      textTransform: "none",
      "& > span": {
        marginLeft: theme.spacing(1),
      },
    },
    paper: {
      padding: theme.spacing(2),
    },
    popover: {
      pointerEvents: "none",
    },
    countryFlag: {
      fontSize: theme.typography.pxToRem(32),
    },
    boldedButton: {
      fontWeight: theme.typography.fontWeightBold,
    },
    bodyText: {
      overflow: "hidden",
    },
  })
);

const FactCheckRatingCard = ({
  className,
  userLoggedIn,
  contentId,
  rating,
  displayName,
  country,
  elevation,
  disableAvatar = false,
  origin,
  action,
  onRatingEditorOpen,
}: FactCheckRatingCardProps) => {
  const ratingId = rating.id;
  const createdAt = rating.createdAt;
  const scores = [rating.score1, rating.score2, rating.score3];
  const justification = rating.justification ?? "";
  const upvoteCount = rating.upvoteCount ?? 0;
  const downvoteCount = rating.downvoteCount ?? 0;
  const isUpvoted = !!rating.isUpvoted;
  const isDownvoted = !!rating.isDownvoted;

  const prefersDarkMode: boolean = useSelector((state: RootState) => state.settingsReducer.prefersDarkMode);

  const classes = useStyles();
  const intl = useIntl();

  const [anchorElBreakdown, setAnchorElBreakdown] = useState<HTMLElement | null>(null);
  const openBreakdownPopover = Boolean(anchorElBreakdown);
  const breakdownPopoverId = openBreakdownPopover ? "rating-breakdown-popover" : undefined;
  const handleBreakdownPopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (event.currentTarget != null) {
      setAnchorElBreakdown(event.currentTarget);
    }
  };
  const handleBreakdownPopoverClose = () => setAnchorElBreakdown(null);

  return (
    <FlatPaper
      rootComponent={Card}
      className={clsx(classes.root, className)}
      elevation={elevation}
      prefersDarkMode={prefersDarkMode}
      square
    >
      <FactCheckRatingHeader
        displayName={displayName}
        createdAt={createdAt}
        country={country}
        disableAvatar={disableAvatar}
      />
      <CardContent className={classes.content}>
        <div
          className={classes.ratingWrapper}
          onMouseOver={handleBreakdownPopoverOpen}
          onMouseOut={handleBreakdownPopoverClose}
          aria-owns={breakdownPopoverId}
          aria-haspopup="true"
        >
          <Rating
            size="large"
            value={findMean(scores)}
            precision={0.1}
            readOnly
            aria-label={intl.formatMessage({ id: "factCheck.userRatings.rating.aria" })}
          />
        </div>
        <Popover
          id={breakdownPopoverId}
          className={classes.popover}
          classes={{ paper: classes.paper }}
          open={openBreakdownPopover}
          anchorEl={anchorElBreakdown}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <FactCheckRatingBreakdown displayName={displayName} origin={origin} scores={scores} />
        </Popover>
        <Typography className={clsx(classes.bodyText, "clamped-text--five-lines")} component="p" variant="body2">
          {justification}
        </Typography>
        <span className={classes.boldedButton}>
          {intl.formatMessage({ id: "factCheck.userRatings.action.readMore" })}
        </span>
      </CardContent>
      <CardActions className={classes.actions}>
        <FactCheckRatingActions
          ratingId={ratingId}
          contentId={contentId}
          upvoteCount={upvoteCount}
          downvoteCount={downvoteCount}
          userLoggedIn={userLoggedIn}
          isUpvoted={isUpvoted}
          isDownvoted={isDownvoted}
          action={action}
          onRatingEditorOpen={onRatingEditorOpen}
        />
      </CardActions>
    </FlatPaper>
  );
};

export default FactCheckRatingCard;
