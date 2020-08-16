import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import Sorter from "../../../common/Sorter";
import FactCheckRatingCard from "../user-rating/FactCheckRatingCard";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import factCheckSortCategories from "../../../static/data/fact-check-sort-categories";
import { RatingOrigin, RatingAction } from "../../../static/enums";

interface FactCheckRatingsProps {
  contentId: string;
  content: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    ratingSorter: {
      width: "100%",
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    ratingCard: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
);

const FactCheckRatings = ({ contentId, content }: FactCheckRatingsProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const [ratings, setRatings] = useState(content?.ratingSet);

  const [sortMode, setSortMode] = useState<{ value: number; comparator: (a: any, b: any) => number }>({
    value: 0,
    comparator: factCheckSortCategories[0].comparator,
  });
  const handleSortingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as number;
    setSortMode({ value, comparator: factCheckSortCategories[value].comparator });
  };

  useEffect(() => {
    if (content?.ratingSet) {
      const r = [...content?.ratingSet];
      r.sort(sortMode.comparator);
      setRatings(r);
    }
  }, [content, sortMode]);

  return (
    <>
      {ratings?.length > 0 && (
        <Sorter
          variant="outlined"
          className={classes.ratingSorter}
          name="fact-check-rating"
          sortCategoryIndex={sortMode.value}
          sortCategories={factCheckSortCategories}
          onSortingChange={handleSortingChange}
          disableDefaultOption
          aria-label={intl.formatMessage({ id: "factCheck.userRatings.action.sort.aria" })}
        />
      )}
      {ratings?.map((rating: any) => (
        <FactCheckRatingCard
          key={`rating-${rating.id}`}
          className={classes.ratingCard}
          ratingId={rating.id}
          contentId={contentId}
          displayName={rating.user.displayName}
          createdAt={rating.createdAt}
          scores={[rating.score1, rating.score2, rating.score3]}
          justification={rating.justification}
          country={rating.user.country}
          upvoteCount={rating.upvoteCount}
          downvoteCount={rating.downvoteCount}
          origin={RatingOrigin.THEIRS}
          action={RatingAction.VOTE}
        />
      ))}
    </>
  );
};

export default FactCheckRatings;
