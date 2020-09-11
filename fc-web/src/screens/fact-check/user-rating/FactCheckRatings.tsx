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
  userLoggedIn: boolean;
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

const FactCheckRatings = ({ contentId, content, userLoggedIn }: FactCheckRatingsProps) => {
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
          className={classes.ratingSorter}
          variant="outlined"
          name="fact-check-rating"
          label={intl.formatMessage({ id: "general.action.sortBy" })}
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
          userLoggedIn={userLoggedIn}
          contentId={contentId}
          rating={rating}
          displayName={rating.user.displayName}
          country={rating.user.country}
          origin={RatingOrigin.THEIRS}
          action={RatingAction.VOTE}
        />
      ))}
    </>
  );
};

export default FactCheckRatings;
