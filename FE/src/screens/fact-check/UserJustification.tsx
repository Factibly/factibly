import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Avatar, Typography, Card, CardHeader, CardContent, CardActions, IconButton, Link } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {},
    content: {
      paddingTop: 0,
      paddingBottom: 0
    },
    actions: {
      padding: 0
    }
  })
);

const UserJustification = () => {
  const classes = useStyles();

  return (
    <Card elevation={0} raised={false} style={{ textAlign: "left", backgroundColor: "inherit" }}>
      <CardHeader
        className={classes.header}
        avatar={<Avatar aria-label="user"> JF </Avatar>}
        title="Jadon Fan "
        subheader="500 votes"
      />
      <CardContent className={`${classes.content} ellipsis`}>
        <Typography variant="body2" component="p" style={{ overflow: "hidden" }}>
          That tweet is right, the following link is the Walmart page that sells an All Lives Matter shirts That tweetv
          That tweet is right, the following link is the Walmart page that sells an All Lives Matter shirts That tweet
          That tweet is right, the following link is the Walmart page that sells an All Lives Matter shirts That tweet
          That tweet is right, the following link is the Walmart page that sells an All Lives Matter shirts That tweet
          That tweet is right, the following link is the Walmart page that sells an All Lives Matter shirts That tweet
          That tweet is right, the following link is the Walmart page that sells an All Lives Matter shirts That tweet
          That tweet is right, the following link is the Walmart page that sells an All Lives Matter shirts That tweet
          That tweet is right, the following link is the Walmart page that sells an All Lives Matter shirts That tweet
        </Typography>
        <Link href="#"> Read More </Link>
      </CardContent>
      <CardActions className={classes.actions} disableSpacing>
        <IconButton aria-label="upvote">
          <ThumbUpAltIcon />
        </IconButton>
        <IconButton aria-label="downvote">
          <ThumbDownAltIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default UserJustification;
