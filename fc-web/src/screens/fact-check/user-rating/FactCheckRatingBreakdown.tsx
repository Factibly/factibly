import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import { RatingOrigin } from "../../../static/enums";
import clsx from "clsx";

interface FactCheckRatingBreakdownProps {
  displayName: string;
  scores: number[];
  origin: RatingOrigin;
  style?: React.CSSProperties;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    firstColumnItem: {
      paddingRight: theme.spacing(1),
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "max-content auto",
      gridTemplateAreas: "'accuracy rating0' 'expertise rating1' 'strength rating2'",
    },
    gridItem: {
      display: "flex",
      margin: "auto",
    },
    criterionField0: {
      gridArea: "accuracy",
    },
    criterionRating0: {
      gridArea: "rating0",
    },
    criterionField1: {
      gridArea: "expertise",
    },
    criterionRating1: {
      gridArea: "rating1",
    },
    criterionField2: {
      gridArea: "strength",
    },
    criterionRating2: {
      gridArea: "rating2",
    },
  })
);

const FactCheckRatingBreakdown = ({ displayName, scores, origin, style }: FactCheckRatingBreakdownProps) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className={classes.gridContainer} style={style}>
      {Array.apply(null, Array(3)).map((_, i) => {
        const criterionName = intl.formatMessage({ id: `factCheck.userRatings.criterion${i + 1}` });
        return (
          <React.Fragment key={`fact-check-rating-criterion-${criterionName}`}>
            <span className={clsx(classes.firstColumnItem, classes.gridItem, classes[`criterionField${i}`])}>
              {criterionName}
            </span>
            <Rating
              className={clsx(classes.gridItem, classes[`criterionRating${i}`])}
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
