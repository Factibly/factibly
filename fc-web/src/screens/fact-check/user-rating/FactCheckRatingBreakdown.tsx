import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Rating } from "@material-ui/lab";
import { RatingOrigin } from "../../../static/enums";
import clsx from "clsx";

interface FactCheckRatingBreakdownProps {
  displayName: string;
  scores: number[];
  origin: RatingOrigin;
  style?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    firstColumnItem: {
      paddingRight: theme.spacing(1),
    },
  })
);

const FactCheckRatingBreakdown = ({ displayName, scores, origin, style }: FactCheckRatingBreakdownProps) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className="rating-breakdown-grid--container" style={style}>
      {Array.apply(null, Array(3)).map((_, i) => {
        const criterionName = intl.formatMessage({ id: `factCheck.userRatings.criterion${i + 1}.title` });
        return (
          <React.Fragment key={`fact-check-rating-criterion-${criterionName}`}>
            <span
              className={clsx(
                classes.firstColumnItem,
                "rating-breakdown-grid--container-item",
                `rating-breakdown-grid--field${i}`
              )}
            >
              {criterionName}
            </span>
            <Rating
              className={`rating-breakdown-grid--container-item rating-breakdown-grid--rating${i}`}
              value={scores[i]}
              precision={0.1}
              readOnly
              aria-label={
                origin === RatingOrigin.YOURS
                  ? intl.formatMessage({ id: "factCheck.userRatings.criterion.yours.aria" }, { criterionName })
                  : intl.formatMessage(
                      { id: `factCheck.userRatings.criterion.${origin}.aria` },
                      { displayName, criterionName }
                    )
              }
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default FactCheckRatingBreakdown;
