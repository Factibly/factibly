import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { useIntl } from "react-intl";
import FakeCheckFlatPaper from "../../../common/FakeCheckFlatPaper";
import FactCheckRatingHeader from "./FactCheckRatingHeader";
import FactCheckRatingBreakdown from "./FactCheckRatingBreakdown";
import FactCheckRatingActions from "./FactCheckRatingActions";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography, Card, CardContent, CardActions, Link, Popover } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { RatingOrigin, RatingAction } from "../../../static/enums";
import { findMean } from "../../../utils/number-utils";
import clsx from "clsx";

interface FactCheckRatingCardProps {
  className?: string;
  displayName: string;
  ratingId: string;
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
    countryFlag: {
      fontSize: theme.typography.pxToRem(32),
    },
  })
);

const FactCheckRatingCard = ({
  className,
  displayName,
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
  disableAvatar = false,
  origin,
  action,
  onRatingEditorOpen,
}: FactCheckRatingCardProps) => {
  const prefersDarkMode: boolean = useSelector((state: RootState) => state.settingsReducer.prefersDarkMode);

  const classes = useStyles();
  const intl = useIntl();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopover = Boolean(anchorEl);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (event.currentTarget != null) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <FakeCheckFlatPaper
      rootComponent={Card}
      className={clsx(classes.root, className)}
      elevation={elevation}
      inheritBackground={inheritBackground}
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
          onMouseOver={handlePopoverOpen}
          onMouseOut={handlePopoverClose}
          aria-owns={openPopover ? "rating-breakdown-popover" : undefined}
          aria-haspopup="true"
          style={{ width: "fit-content" }}
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
          id="rating-breakdown-popover"
          className={classes.popover}
          classes={{ paper: classes.paper }}
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
          <FactCheckRatingBreakdown displayName={displayName} origin={origin} scores={scores} />
        </Popover>
        <Typography className="five-lines-capped-text" component="p" variant="body2" style={{ overflow: "hidden" }}>
          {justification}
        </Typography>
        <Link href="#"> {intl.formatMessage({ id: "factCheck.userRatings.action.readMore" })} </Link>
      </CardContent>
      <CardActions className={classes.actions} disableSpacing>
        <FactCheckRatingActions
          ratingId={ratingId}
          contentId={contentId}
          upvoteCount={upvoteCount}
          downvoteCount={downvoteCount}
          action={action}
          onRatingEditorOpen={onRatingEditorOpen}
        />
      </CardActions>
    </FakeCheckFlatPaper>
  );
};

export default FactCheckRatingCard;
