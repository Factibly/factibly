import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useIntl } from "react-intl";
import RatingBreakdownGrid from "./RatingBreakdownGrid";
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
  Avatar,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Link,
  Button,
  Popover,
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Rating } from "@material-ui/lab";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ReactCountryFlag from "react-country-flag";
import { useMutation } from "@apollo/client";
import { RATING_UPVOTE, RATING_DOWNVOTE } from "../../gql/mutations";
import { formatAsDaysAgo } from "../../utils/date-utils";
import { findMean } from "../../utils/number-utils";
import { CONTENT } from "../../gql/queries";

export enum RatingAction {
  Edit,
  Vote,
}
interface UserRatingProps {
  className?: any;
  user: string;
  ratingId: string | number;
  contentId: string;
  createdAt: Date;
  scores: number[];
  justification: string;
  country?: string;
  upvoteCount?: number;
  downvoteCount?: number;
  elevation?: number;
  inheritBackground?: boolean;
  disableAvatar?: boolean;
  ratingAction: RatingAction;
  onRatingEditorOpen?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: ({ prefersDarkMode, inheritBackground }: any) => ({
    textAlign: "left",
    backgroundColor: inheritBackground ? "inherit" : prefersDarkMode ? grey[800] : grey[200],
  }),
  content: {
    paddingTop: 0,
    paddingBottom: 0,
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
}));

const UserRating = ({
  className,
  user,
  ratingId,
  contentId,
  createdAt,
  scores,
  justification,
  country,
  upvoteCount = 0,
  downvoteCount = 0,
  elevation,
  inheritBackground,
  disableAvatar,
  ratingAction,
  onRatingEditorOpen,
}: UserRatingProps) => {
  const prefersDarkMode: boolean = useSelector((state: any) => state.screenReducers.prefersDarkMode);

  const classes = useStyles({ prefersDarkMode, inheritBackground });
  const intl = useIntl();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopover = Boolean(anchorEl);

  const [upvoteMutation] = useMutation(RATING_UPVOTE, {
    variables: { ratingId },
    refetchQueries: [
      {
        query: CONTENT,
        variables: { contentId },
      },
    ],
  });
  const [downvoteMutation] = useMutation(RATING_DOWNVOTE, {
    variables: { ratingId },
    refetchQueries: [
      {
        query: CONTENT,
        variables: { contentId },
      },
    ],
  });

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (event.currentTarget != null) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const selectRatingActions = () => {
    var actions: React.ReactNode = <> </>;
    if (ratingAction === RatingAction.Vote) {
      actions = (
        <>
          <Button startIcon={<ThumbUpAltIcon />} onClick={() => upvoteMutation()} aria-label="upvote">
            {intl.formatNumber(upvoteCount)}
          </Button>
          <Button startIcon={<ThumbDownAltIcon />} onClick={() => downvoteMutation()} aria-label="downvote">
            {intl.formatNumber(downvoteCount)}
          </Button>
        </>
      );
    } else if (ratingAction === RatingAction.Edit) {
      actions = (
        <>
          <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faEdit} />} onClick={onRatingEditorOpen}>
            {intl.formatMessage({ id: "general.action.edit.name" })}
          </Button>
          <Typography variant="body2" component="span">
            {intl.formatMessage(
              { id: "factCheck.userRatings.upvoteCount.name" },
              { upvoteCount: intl.formatNumber(upvoteCount) }
            )}
            &nbsp;&middot;&nbsp;
            {intl.formatMessage(
              { id: "factCheck.userRatings.downvoteCount.name" },
              { downvoteCount: intl.formatNumber(downvoteCount) }
            )}
          </Typography>
        </>
      );
    }

    return actions;
  };

  return (
    <Card className={`${classes.root} ${className}`} elevation={elevation ?? 0}>
      <CardHeader
        avatar={disableAvatar || <Avatar alt={user} aria-label={user} />}
        title={user}
        subheader={createdAt && formatAsDaysAgo(createdAt, intl)}
        action={country && <ReactCountryFlag countryCode={country} svg style={{ fontSize: 32 }} />}
      />
      <CardContent className={classes.content}>
        <div
          onMouseOver={handlePopoverOpen}
          onMouseOut={handlePopoverClose}
          aria-owns={openPopover ? "rating-breakdown-popover" : undefined}
          aria-haspopup="true"
        >
          <Rating size="large" value={findMean(scores)} precision={0.1} readOnly />
        </div>
        <Popover
          id="rating-breakdown-popover"
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={openPopover}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <RatingBreakdownGrid scores={scores} />
        </Popover>
        <Typography className="ellipsis" component="p" variant="body2" style={{ overflow: "hidden" }}>
          {justification}
        </Typography>
        <Link href="#"> {intl.formatMessage({ id: "factCheck.userRatings.action.readMore.name" })} </Link>
      </CardContent>
      <CardActions className={classes.actions} disableSpacing>
        {selectRatingActions()}
      </CardActions>
    </Card>
  );
};

export default UserRating;
