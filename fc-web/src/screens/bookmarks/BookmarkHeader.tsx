import React, { useState } from "react";
import { useIntl } from "react-intl";
import Flex from "../../common/Flex";
import SearchField from "../../common/SearchField";
import Sorter from "../../common/Sorter";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import bookmarkSortCategories from "../../static/data/bookmark-sort-categories";
import clsx from "clsx";
interface BookmarkHeaderProps {
  total: number;
  onSubmitSearch: Function;
  sortCategoryIndex: number;
  onSortingChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      flexWrap: "wrap",
    },
    innerFlex: {
      flexWrap: "wrap",
      marginBottom: theme.spacing(2),
      "& > *": {
        margin: theme.spacing(0, 2),
      },
    },
    innerFlex1: {
      flex: 2,
    },
    innerFlex2: {
      flex: 1,
      [theme.breakpoints.up("sm")]: {
        justifyContent: "flex-end",
      },
    },
  })
);

const BookmarkHeader = ({ total, onSubmitSearch, sortCategoryIndex = -1, onSortingChange }: BookmarkHeaderProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
    setSearchQuery(event.target.value);
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitSearch(searchQuery);
  };

  return (
    <Flex className={classes.flex}>
      <Flex className={clsx(classes.innerFlex, classes.innerFlex1)}>
        <form role="search" onSubmit={handleSearchSubmit} noValidate>
          <SearchField
            name="bookmark"
            label={intl.formatMessage({ id: "general.action.search" })}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </form>
        <Sorter
          variant="outlined"
          name="bookmark"
          label={intl.formatMessage({ id: "general.action.sortBy" })}
          margin="dense"
          sortCategoryIndex={sortCategoryIndex}
          sortCategories={bookmarkSortCategories}
          onSortingChange={onSortingChange}
          startIcon={<SortIcon />}
        />
      </Flex>
      <Flex className={clsx(classes.innerFlex, classes.innerFlex2)}>
        <Typography variant="h5" style={{ whiteSpace: "nowrap" }}>
          {intl.formatMessage({ id: "bookmarks.bookmark.count" }, { bookmarkCount: intl.formatNumber(total) })}
        </Typography>
      </Flex>
    </Flex>
  );
};

export default BookmarkHeader;
