import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { useIntl } from "react-intl";
import FakeCheckFlatPaper from "../../../common/FakeCheckFlatPaper";
import FactCheckShareMenu from "../FactCheckShareMenu";
import FactCheckOverviewDesktop from "./FactCheckOverviewDesktop";
import FactCheckOverviewMobile from "./FactCheckOverviewMobile";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Hidden } from "@material-ui/core";
import { BOOKMARK_CONTENT } from "../../../gql/mutations";
import { CONTENT } from "../../../gql/queries";
import { useMutation } from "@apollo/client";
import { useAlert } from "../../../hooks/useAlert";
import { BookmarkContentVariables, BookmarkContent } from "../../../gql/__generated__/BookmarkContent";

interface FactCheckOverviewProps {
  content: any;
  userLoggedIn: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
  })
);

const overviews = Object.freeze([
  { type: "desktop", breakpoint: { smDown: true }, Overview: FactCheckOverviewDesktop },
  { type: "mobile", breakpoint: { mdUp: true }, Overview: FactCheckOverviewMobile },
]);

const FactCheckOverview = ({ content, userLoggedIn }: FactCheckOverviewProps) => {
  const prefersDarkMode: boolean = useSelector((state: RootState) => state.settingsReducer.prefersDarkMode);

  const classes = useStyles();
  const intl = useIntl();

  const [, setAlert] = useAlert();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleOpenShareMenu = (event: any) => setAnchorEl(event.currentTarget);
  const handleCloseShareMenu = () => setAnchorEl(null);

  const [bookmarkMutation] = useMutation<BookmarkContent, BookmarkContentVariables>(BOOKMARK_CONTENT, {
    variables: {
      input: {
        contentId: content.id,
      },
    },
    update: client => {
      const cachedData: any = client.readQuery({ query: CONTENT, variables: { contentId: content.id } });
      let newData = { ...cachedData.content };
      newData.isBookmarked = true;
      client.writeQuery({
        query: CONTENT,
        variables: { contentId: content.id },
        data: { content: newData },
      });
    },
  });
  const handleCreateBookmark = async () => {
    await bookmarkMutation();
    setAlert({
      severity: "success",
      message: intl.formatMessage({ id: "bookmarks.alert.msg.added" }),
    });
  };

  return (
    <FakeCheckFlatPaper className={classes.root} elevation={0} prefersDarkMode={prefersDarkMode} square>
      {overviews.map(({ type, breakpoint, Overview }) => (
        <Hidden key={`fact-check-overview-${type}`} implementation="css" {...breakpoint}>
          <Overview
            content={content}
            userLoggedIn={userLoggedIn}
            onOpenShareMenu={handleOpenShareMenu}
            onCreateBookmark={handleCreateBookmark}
          />
        </Hidden>
      ))}
      <FactCheckShareMenu anchorEl={anchorEl} onCloseShareMenu={handleCloseShareMenu} />
    </FakeCheckFlatPaper>
  );
};

export default FactCheckOverview;
