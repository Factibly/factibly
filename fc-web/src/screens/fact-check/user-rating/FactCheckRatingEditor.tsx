import React, { useState } from "react";
import { Prompt } from "react-router-dom";
import { useIntl } from "react-intl";
import { isMobileOnly } from "react-device-detect";
import FakeCheckInput from "../../../common/FakeCheckInput";
import Draggable from "react-draggable";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  Typography,
  Button,
  Paper,
  PaperProps,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { RateContent, RateContentVariables } from "../../../gql/__generated__/RateContent";
import { RATE_CONTENT } from "../../../gql/mutations";
import { CONTENT } from "../../../gql/queries";
import { useAlert } from "../../../hooks/useAlert";
import { isEqual } from "lodash";
import { parseGqlErrorMsg } from "../../../utils/string-utils";
import { useCustomMutation } from "../../../hooks/gql";

interface FactCheckRatingEditorProps {
  contentId: any;
  defaultScores?: number[];
  defaultJustification?: string;
  open: boolean;
  onClose: () => any;
  executeRecaptcha?: (action?: string | undefined) => Promise<string>;
}

const useStyles = makeStyles(() =>
  createStyles({
    dialogPaper: {
      width: 512,
    },
  })
);

const PaperComponent = (props: PaperProps) => {
  return (
    <Draggable handle="#rating-editor-form-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
};

const FactCheckRatingEditor = ({
  contentId,
  defaultScores,
  defaultJustification,
  open,
  onClose,
  executeRecaptcha,
}: FactCheckRatingEditorProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const [, setAlert] = useAlert();
  const [ratingMutation] = useCustomMutation<RateContent, RateContentVariables>(RATE_CONTENT);

  const [ratingDes1, setRatingDes1] = useState<string>("");
  const [ratingDes2, setRatingDes2] = useState<string>("");
  const [ratingDes3, setRatingDes3] = useState<string>("");
  const ratingDescriptions = [ratingDes1, ratingDes2, ratingDes3];
  const handleRatingHover = (value: number, index: number) => {
    [setRatingDes1, setRatingDes2, setRatingDes3][index](
      value > 0 ? `factCheck.userRatings.criterion${index + 1}.${value}` : ""
    );
  };

  const [scores, setScores] = useState<number[]>(defaultScores ?? [0, 0, 0]);
  const handleRatingChange = (value: number | null, index: number) => {
    let newScores = [...scores];
    newScores[index] = value ?? 1;
    setScores(newScores);
  };

  const [justification, setJustification] = useState<string>(defaultJustification ?? "");
  const handleJustificationChange = (event: any) => setJustification(event.target.value);

  const [ratingFormCompleted, setRatingFormCompleted] = useState<boolean>(false);
  const handleEditorSubmit = async (event: any) => {
    event.preventDefault();

    if (executeRecaptcha) {
      executeRecaptcha("submit_rating").then(async recaptchaToken => {
        try {
          await ratingMutation({
            variables: {
              input: {
                contentId,
                score1: scores[0],
                score2: scores[1],
                score3: scores[2],
                justification,
                recaptchaToken,
              },
            },
            refetchQueries: [
              {
                query: CONTENT,
                variables: { contentId },
              },
            ],
          });
          setAlert({
            severity: "success",
            message: intl.formatMessage({ id: "factCheck.userRatings.alert.msg.submitted" }),
          });
        } catch (err) {
          setAlert({
            severity: "error",
            message: intl.formatMessage({ id: parseGqlErrorMsg(err.toString()) }),
          });
        }
      });
    }

    setRatingFormCompleted(true);
    onClose();
  };

  const ratingChanged = () => !isEqual(scores, defaultScores) || !isEqual(justification, defaultJustification);

  return (
    <>
      <Dialog
        classes={{ paper: classes.dialogPaper }}
        open={open}
        onClose={onClose}
        fullScreen={isMobileOnly}
        PaperComponent={PaperComponent}
        aria-labelledby="rating-editor-form-title"
        aria-describedby="rating-editor-form-description"
      >
        <DialogTitle id="rating-editor-form-title" style={{ cursor: "move" }}>
          {intl.formatMessage({ id: "factCheck.userRatings.action.rate.rateSource" })}
        </DialogTitle>
        <DialogContent id="rating-editor-form-description">
          <form autoComplete="off">
            <Box component="fieldset" pt={0} px={0} borderColor="transparent">
              {Array.apply(null, Array(3)).map((_, i) => {
                const criterionName = intl.formatMessage({ id: `factCheck.userRatings.criterion${i + 1}.title` });
                return (
                  <DialogContentText key={`rating-question-${i}`} component="div" color="inherit">
                    <Typography component="div" id={`rating-criterion-${criterionName}-edit`}>
                      {intl.formatMessage({ id: `factCheck.userRatings.criterion${i + 1}.question` })}
                    </Typography>
                    <div
                      className="grid--first-column-shrink"
                      aria-labelledby={`rating-criterion-${criterionName}-edit`}
                    >
                      <Rating
                        name={`rating-criterion-${criterionName}`}
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
            </Box>
            <FakeCheckInput
              name="justification"
              label={intl.formatMessage({ id: "factCheck.userRatings.justification" })}
              value={justification}
              onChange={handleJustificationChange}
              multiline
              rows={8}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            {intl.formatMessage({ id: "general.action.cancel" })}
          </Button>
          <Button onClick={handleEditorSubmit} disabled={scores.some(score => score === 0)} color="primary">
            {intl.formatMessage({ id: "general.action.submit" })}
          </Button>
        </DialogActions>
      </Dialog>
      <Prompt
        when={ratingChanged() && !ratingFormCompleted}
        message={intl.formatMessage({ id: "general.dialog.navChangeUnsaved.message" })}
      />
    </>
  );
};

export default FactCheckRatingEditor;
