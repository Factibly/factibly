import React, { useState } from "react";
import { useIntl } from "react-intl";
// import ReactQuill from "react-quill";
import TextInput from "../../common/TextInput";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useMutation } from "@apollo/client";
import { RATING } from "../../gql/mutations";
import { CONTENT } from "../../gql/queries";

interface RatingEditorProps {
  open: boolean;
  contentId: any;
  defaultScores?: number[];
  defaultJustification?: string;
  handleClose: () => any;
}

const RatingEditor = ({ contentId, defaultScores, defaultJustification, open, handleClose }: RatingEditorProps) => {
  const intl = useIntl();

  const [scores, setScores] = useState<number[]>(defaultScores ?? [0, 0, 0]);
  const [ratingDes1, setRatingDes1] = useState<string>("");
  const [ratingDes2, setRatingDes2] = useState<string>("");
  const [ratingDes3, setRatingDes3] = useState<string>("");
  const [justification, setJustification] = useState<string>(defaultJustification ?? "");

  const [ratingMutation] = useMutation(RATING, {
    variables: {
      contentId,
      score1: scores[0],
      score2: scores[1],
      score3: scores[2],
      justification,
    },
    update: (client, { data }) => {
      // TODO: FAVOUR CACHE UPDATE OVER REFETECHQUERY BUT THIS IS NOT WORKING FOR GOD KNOWS
      // WHAT REASON. SUPER WEIRD, WILL NEED TO INVESTIGATE
      // Update the cache with our Content Query to reflect the new user rating
      // const cachedData: any = client.readQuery({ query: CONTENT, variables: { contentId } });
      // let newData = { ...cachedData };
      // newData.content.userRating = data.rateContent.rating;
      // client.writeQuery({ query: CONTENT, variables: { contentId }, data: newData });
    },
    refetchQueries: [
      {
        query: CONTENT,
        variables: { contentId },
      },
    ],
  });

  const handleRatingHover = (value: number, index: number) => {
    [setRatingDes1, setRatingDes2, setRatingDes3][index](
      value > 0 ? `factCheck.userRatings.criterion${index + 1}.${value}.content` : ""
    );
  };

  const ratingDescriptions = [ratingDes1, ratingDes2, ratingDes3];

  const handleRatingChange = (value: number | null, index: number) => {
    let newScores = [...scores];
    newScores[index] = value ?? 1;
    setScores(newScores);
  };

  const handleJustificationChange = (event: any) => {
    setJustification(event.target.value);
  };

  const handleEditorSubmit = (event: any) => {
    event.preventDefault();
    ratingMutation();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {intl.formatMessage({ id: "factCheck.userRatings.action.rate.rateSource.name" })}
      </DialogTitle>
      <DialogContent>
        {Array.apply(null, Array(3)).map((_, i) => {
          return (
            <DialogContentText key={`rating-question-${i}`} color="inherit">
              {intl.formatMessage({ id: `factCheck.userRatings.criterion${i + 1}.question.content` })}
              <div className="grid--first-column-shrink">
                <Rating
                  size="large"
                  value={scores[i]}
                  onChangeActive={(_, value) => handleRatingHover(value, i)}
                  onChange={(_, value) => handleRatingChange(value, i)}
                />
                <span style={{ display: "flex", justifyContent: "left", alignItems: "center" }}>
                  {ratingDescriptions[i] && intl.formatMessage({ id: ratingDescriptions[i] })}
                </span>
              </div>
            </DialogContentText>
          );
        })}
      </DialogContent>
      <DialogContent>
        <TextInput
          name="justification"
          label={intl.formatMessage({ id: "factCheck.userRatings.justification.name" })}
          multiline
          rows={8}
          value={justification}
          onChange={handleJustificationChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {intl.formatMessage({ id: "general.action.cancel.name" })}
        </Button>
        <Button onClick={handleEditorSubmit} disabled={scores.some(score => score === 0)} color="primary">
          {intl.formatMessage({ id: "general.action.submit.name" })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RatingEditor;
