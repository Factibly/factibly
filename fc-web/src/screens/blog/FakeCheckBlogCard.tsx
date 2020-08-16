import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent, CardActions, Button, Avatar, IconButton, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    avatar: {
      backgroundColor: red[500],
    },
  })
);

const FakeCheckBlogCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar} aria-label="author">
            JF
          </Avatar>
        }
        title="Understanding the Infodemic"
        subheader="June 28, 2020"
      />
      {/* <CardMedia className={classes.media} image="/static/images/cards/paella.jpg" title="Paella dish" /> */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Welcome to the FakeCheck Blog!
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button aria-label="Read More"> Read More </Button>
        <span style={{ marginLeft: "auto" }}>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </span>
      </CardActions>
    </Card>
  );
};

export default FakeCheckBlogCard;
