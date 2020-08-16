import React from "react";
import { useIntl } from "react-intl";
import Flex from "../../common/Flex";
import ContrastingDivider from "../../common/ContrastingDivider";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import LaunchIcon from "@material-ui/icons/Launch";
import DeleteIcon from "@material-ui/icons/Delete";
import { FACT_CHECK_PATH } from "../../static/paths";

interface BookmarkCardProps {
  content?: any;
  onRemoveBookmark: Function;
  hideLine?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      flexDirection: "row",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    innerFlex: {
      flex: 3,
      flexDirection: "column",
      paddingLeft: theme.spacing(4),
    },
    coverImage: {
      flex: 1,
      paddingTop: "10%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
  })
);

const BookmarkCard = ({ content, onRemoveBookmark, hideLine }: BookmarkCardProps) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <>
      <Flex className={classes.flex}>
        <Flex className={classes.coverImage} style={{ backgroundImage: `url(${content.imageUrl})` }} />
        <Flex className={classes.innerFlex}>
          <Typography variant="h6"> {content.title || content.url} </Typography>
          {content?.overallScore ? (
            <Rating
              precision={0.1}
              value={content.overallScore}
              readOnly
              aria-label={intl.formatMessage({ id: "factCheck.overview.rating.aria" })}
            />
          ) : (
            intl.formatMessage({ id: "factCheck.overview.rating.none" })
          )}
        </Flex>
        <Flex style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
          <Tooltip title={intl.formatMessage({ id: "bookmarks.bookmark.action.view.factCheck" })}>
            <IconButton
              href={FACT_CHECK_PATH.replace(":contentId", content.id)}
              aria-label={intl.formatMessage({ id: "bookmarks.bookmark.action.view.factCheck.aria" })}
            >
              <LaunchIcon color="primary" fontSize="large" />
            </IconButton>
          </Tooltip>
          {/* <FontAwesomeIcon className={classes.icon} size="2x" icon={faShare} /> */}
          <Tooltip title={intl.formatMessage({ id: "general.action.delete" })}>
            <IconButton
              onClick={() => onRemoveBookmark(content.id)}
              aria-label={intl.formatMessage({ id: "general.action.delete.aria" })}
            >
              <DeleteIcon color="secondary" fontSize="large" />
            </IconButton>
          </Tooltip>
        </Flex>
      </Flex>
      <ContrastingDivider hideLine={hideLine} />
    </>
  );
};

export default BookmarkCard;
