import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useIntl } from "react-intl";
import Flex from "../../common/Flex";
import ContrastingDivider from "../../common/ContrastingDivider";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Button, Tooltip, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import LaunchIcon from "@material-ui/icons/Launch";
import DeleteIcon from "@material-ui/icons/Delete";
import { FACT_CHECK_BASE_PATH } from "../../static/paths";

interface BookmarkCardProps {
  content: any;
  onRemoveBookmark: (contentId: number) => Promise<void>;
  hideLine?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flex: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    innerFlex1: {
      flex: 3,
      flexDirection: "column",
      paddingLeft: theme.spacing(4),
    },
    innerFlex2: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
    },
    coverImage: {
      flex: 1,
      paddingTop: "10%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    button: {
      borderRadius: 0,
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
        <Flex className={classes.innerFlex1}>
          <Typography variant="h6">{content.title || content.url}</Typography>
          {content.overallScore ? (
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
        <Flex className={classes.innerFlex2}>
          <Tooltip title={intl.formatMessage({ id: "bookmarks.bookmark.action.view.factCheck" })}>
            <Button
              className={classes.button}
              component={RouterLink}
              to={`${FACT_CHECK_BASE_PATH}/${content.id}`}
              variant="contained"
              color="primary"
              size="large"
              disableElevation
              aria-label={intl.formatMessage({ id: "bookmarks.bookmark.action.view.factCheck.aria" })}
            >
              <LaunchIcon />
            </Button>
          </Tooltip>
          {/* <FontAwesomeIcon className={classes.icon} size="2x" icon={faShare} /> */}
          <Tooltip title={intl.formatMessage({ id: "general.action.delete" })}>
            <Button
              className={classes.button}
              variant="contained"
              onClick={() => onRemoveBookmark(content.id)}
              color="secondary"
              size="large"
              disableElevation
              aria-label={intl.formatMessage({ id: "general.action.delete.aria" })}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
      <ContrastingDivider hideLine={hideLine} />
    </>
  );
};

export default BookmarkCard;
