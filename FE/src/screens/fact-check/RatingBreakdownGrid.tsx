import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Rating } from "@material-ui/lab";

interface RatingBreakdownGridProps {
  scores: number[];
  style?: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    firstColumnItem: {
      paddingRight: theme.spacing(1),
    },
  })
);

const RatingBreakdownGrid = ({ scores, style }: RatingBreakdownGridProps) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className="rating-breakdown--grid-container" style={style}>
      {Array.apply(null, Array(3)).map((_, i) => (
        <React.Fragment key={`rating-criterion-${i}`}>
          <span
            className={`${classes.firstColumnItem} rating-breakdown--grid-container-item rating-breakdown-grid--field${i}`}
          >
            {intl.formatMessage({ id: `factCheck.userRatings.criterion${i + 1}.title.name` })}
          </span>
          <Rating
            className={`rating-breakdown--grid-container-item rating-breakdown-grid--rating${i}`}
            value={scores[i]}
            precision={0.1}
            readOnly
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default RatingBreakdownGrid;
