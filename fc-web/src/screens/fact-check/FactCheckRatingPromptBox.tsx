import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { useIntl } from "react-intl";
import FlatPaper from "../../common/FlatPaper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
    },
  })
);

const FactCheckRatingPromptBox = React.forwardRef(({ onOpenRatingEditor, userLoggedIn }: any, ref) => {
  const prefersDarkMode: boolean = useSelector((state: RootState) => state.settingsReducer.prefersDarkMode);

  const classes = useStyles();
  const intl = useIntl();

  return (
    <FlatPaper className={classes.root} elevation={0} prefersDarkMode={prefersDarkMode}>
      <Typography variant="body2" paragraph>
        Only together can we fight the infodemic. With a Factibly account, you can create a new rating for this source
        and help improve the accuracy of the fact check. You will be asked to rate this source based on 3 criteria from
        a scale of 1 to 5 stars and provide a justification for your responses.
      </Typography>
      <Typography variant="body2" paragraph>
        {/* The fact check can have an impact on many people from all walks of life. It could be used by a public official,
        think tank or scientist to clear up public misinformation and restore trust from the general public. It could
        also be used by a business that wants to understand and improve its preceived online reputation, or by the
        general public to recognize the potential biases in what they read or hear. It could even be used for a
        student's research project as a method of finding credible sources. For example, with the COVID-19 pandemic,
        we've seen how fake news can dissuade people from practicing social distancing or wearing a mask; with a
        reliable and easily accessible fact check, we can help restore the trust in public health officials and
        scientists. Your rating matters. */}
        {/* After you submit your rating, you may edit it at any time. However, once you submit your changes, the number of
        upvotes and downvotes for your rating will be reset back to 0. */}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<FontAwesomeIcon icon={faStarHalfAlt} />}
        onClick={onOpenRatingEditor}
        fullWidth
        disableElevation
      >
        {intl.formatMessage({
          id: userLoggedIn ? "factCheck.userRatings.action.rate" : "factCheck.userRatings.action.rate.login",
        })}
      </Button>
      <div ref={ref as any} />
    </FlatPaper>
  );
});

export default FactCheckRatingPromptBox;
