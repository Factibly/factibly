import React, { useState } from "react";
import { useIntl } from "react-intl";
import Flex from "../../common/Flex";
import SearchField from "../../common/SearchField";
import Sorter from "../../common/Sorter";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import bookmarkSortCategories from "../../static/data/bookmark-sort-categories";

interface BookmarkHeaderProps {
  total: number;
  onSubmitSearch: Function;
  sortCategoryIndex: number;
  onSortingChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sortRow: {
      marginBottom: theme.spacing(4),
      "& > *": {
        marginRight: theme.spacing(2),
      },
    },
  })
);

const BookmarkHeader = ({ total, onSubmitSearch, sortCategoryIndex = -1, onSortingChange }: BookmarkHeaderProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const [searchText, setSearchText] = useState<string>("");
  const handleSearchTextChange = (event: any) => setSearchText(event.target.value);
  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitSearch(searchText);
  };

  return (
    <Flex>
      <Flex className={classes.sortRow} style={{ flex: 2 }}>
        <form role="search" onSubmit={handleSearchSubmit} noValidate>
          <SearchField
            name="bookmark"
            label={intl.formatMessage({ id: "general.action.search" })}
            searchText={searchText}
            onSearchTextChange={handleSearchTextChange}
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
      <Flex className={classes.sortRow} style={{ flex: 1, justifyContent: "flex-end" }}>
        <Typography variant="h5" style={{ whiteSpace: "nowrap" }}>
          {intl.formatMessage({ id: "bookmarks.bookmark.count" }, { bookmarkCount: intl.formatNumber(total) })}
        </Typography>
      </Flex>
    </Flex>
  );
};

export default BookmarkHeader;
