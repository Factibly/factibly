import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import PageContainer from "../../common/PageContainer";
import FakeCheckFlatPaper from "../../common/FakeCheckFlatPaper";
import BookmarkIntroductoryPanel from "./BookmarkIntroductoryPanel";
import BookmarkHeader from "./BookmarkHeader";
import BookmarkCard from "./BookmarkCard";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useMutation } from "@apollo/client";
import { RemoveBookmark, RemoveBookmarkVariables } from "../../gql/__generated__/RemoveBookmark";
import { REMOVE_BOOKMARK } from "../../gql/mutations";
import { BOOKMARKS_LIST } from "../../gql/queries";
import { useAlert } from "../../hooks/useAlert";
import bookmarkSortCategories from "../../static/data/bookmark-sort-categories";
import { BookmarksList } from "../../gql/__generated__/BookmarksList";
import { useCustomQuery } from "../../hooks/gql";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      paddingTop: theme.spacing(2),
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
  })
);

const Bookmarks = () => {
  const prefersDarkMode: boolean = useSelector((state: RootState) => state.settingsReducer.prefersDarkMode);

  const classes = useStyles();
  const intl = useIntl();

  const [, setAlert] = useAlert();

  const { data, loading } = useCustomQuery<BookmarksList>(BOOKMARKS_LIST);
  const [bookmarks, setBookmarks] = useState(data?.currentUser?.bookmarks);
  const bookmarkCount = bookmarks?.length ?? 0;

  const [removeBookmark] = useMutation<RemoveBookmark, RemoveBookmarkVariables>(REMOVE_BOOKMARK);
  const handleRemoveBookmark = async (contentId: number) => {
    await removeBookmark({
      variables: { input: { contentId: contentId.toString() } },
      update: client => {
        const cachedData: any = client.readQuery({ query: BOOKMARKS_LIST });
        const bookmarks = cachedData?.currentUser?.bookmarks;
        const newData = { ...cachedData };
        newData.currentUser = { bookmarks: bookmarks.filter((c: any) => c.id !== contentId) };
        client.writeQuery({ query: BOOKMARKS_LIST, data: newData });
      },
    });

    setAlert({
      severity: "success",
      message: intl.formatMessage({ id: "bookmarks.alert.msg.removed" }),
    });
  };

  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleSearchSubmit = (value: string) => setSearchQuery(value.toLowerCase());

  const [sortMode, setSortMode] = useState<{ value: number; comparator: (a: any, b: any) => number }>({
    value: -1,
    comparator: () => 0,
  });
  const handleSortingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as number;
    if (value === -1) {
      setSortMode({ value, comparator: () => 0 });
    } else {
      setSortMode({ value, comparator: bookmarkSortCategories[value].comparator });
    }
  };

  useEffect(() => {
    if (data?.currentUser?.bookmarks) {
      let b = [...data?.currentUser?.bookmarks];
      b.sort(sortMode.comparator);
      if (searchQuery.trim() !== "") {
        b = b.filter(v => v?.title?.toLowerCase().includes(searchQuery));
      }
      setBookmarks(b);
    }
  }, [data, searchQuery, sortMode]);

  if (loading) return <div />;

  return (
    <PageContainer>
      <Helmet>
        <title> {intl.formatMessage({ id: "nav.drawer.item.bookmark" })} </title>
      </Helmet>
      {data?.currentUser?.bookmarks?.length ? (
        <FakeCheckFlatPaper className={classes.paper} elevation={0} prefersDarkMode={prefersDarkMode}>
          <BookmarkHeader
            total={bookmarkCount}
            onSubmitSearch={handleSearchSubmit}
            sortCategoryIndex={sortMode.value}
            onSortingChange={handleSortingChange}
          />
          {bookmarks?.map((bookmark: any, idx: number) => (
            <BookmarkCard
              key={`bookmark-${bookmark.title}`}
              content={bookmark}
              onRemoveBookmark={handleRemoveBookmark}
              hideLine={bookmarkCount === 1 || idx === bookmarkCount - 1}
            />
          ))}
        </FakeCheckFlatPaper>
      ) : (
        <BookmarkIntroductoryPanel userLoggedIn={!!data?.currentUser} />
      )}
    </PageContainer>
  );
};

export default Bookmarks;
