import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    avatar: {
      backgroundColor: red[500]
    }
  })
);

const FakeCheckBlogCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="author" className={classes.avatar}>
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
