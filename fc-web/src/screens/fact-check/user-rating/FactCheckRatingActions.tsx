import React from "react";
import { useIntl } from "react-intl";
import { Typography, Button, Tooltip } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@apollo/client";
import { UPVOTE_RATING, DOWNVOTE_RATING } from "../../../gql/mutations";
import { CONTENT } from "../../../gql/queries";
import { RatingAction } from "../../../static/enums";
import { UpvoteRating, UpvoteRatingVariables } from "../../../gql/__generated__/UpvoteRating";
import { DownvoteRatingVariables, DownvoteRating } from "../../../gql/__generated__/DownvoteRating";

interface FactCheckRatingActionsProps {
  ratingId: string;
  contentId: string;
  upvoteCount?: number;
  downvoteCount?: number;
  action: RatingAction;
  onRatingEditorOpen?: () => void;
}

const FactCheckRatingActions = ({
  ratingId,
  contentId,
  action,
  upvoteCount = 0,
  downvoteCount = 0,
  onRatingEditorOpen,
}: FactCheckRatingActionsProps) => {
  const intl = useIntl();

  const votingMutationOptions = {
    variables: { input: { ratingId } },
    refetchQueries: [
      {
        query: CONTENT,
        variables: { contentId },
      },
    ],
  };
  const [upvoteMutation] = useMutation<UpvoteRating, UpvoteRatingVariables>(UPVOTE_RATING, votingMutationOptions);
  const [downvoteMutation] = useMutation<DownvoteRating, DownvoteRatingVariables>(
    DOWNVOTE_RATING,
    votingMutationOptions
  );

  var CardActionButtons = <> </>;
  if (action === RatingAction.VOTE) {
    CardActionButtons = (
      <>
        <Tooltip title={intl.formatMessage({ id: "factCheck.userRatings.action.approval.upvote" })}>
          <Button
            startIcon={<ThumbUpAltIcon />}
            onClick={() => upvoteMutation()}
            aria-label={intl.formatMessage({ id: "factCheck.userRatings.action.approval.upvote.aria" })}
          >
            {intl.formatNumber(upvoteCount)}
          </Button>
        </Tooltip>
        <Tooltip title={intl.formatMessage({ id: "factCheck.userRatings.action.approval.downvote" })}>
          <Button
            startIcon={<ThumbDownAltIcon />}
            onClick={() => downvoteMutation()}
            aria-label={intl.formatMessage({ id: "factCheck.userRatings.action.approval.downvote.aria" })}
          >
            {intl.formatNumber(Math.abs(downvoteCount))}
          </Button>
        </Tooltip>
      </>
    );
  } else if (action === RatingAction.EDIT) {
    CardActionButtons = (
      <>
        <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faEdit} />} onClick={onRatingEditorOpen}>
          {intl.formatMessage({ id: "general.action.edit" })}
        </Button>
        <Typography component="span" variant="body2">
          {intl.formatMessage(
            { id: "factCheck.userRatings.upvoteCount" },
            { upvoteCount: intl.formatNumber(upvoteCount) }
          )}
          &nbsp;&#9679;&nbsp;
          {intl.formatMessage(
            { id: "factCheck.userRatings.downvoteCount" },
            { downvoteCount: intl.formatNumber(Math.abs(downvoteCount)) }
          )}
        </Typography>
      </>
    );
  }
  return CardActionButtons;
};

export default FactCheckRatingActions;
