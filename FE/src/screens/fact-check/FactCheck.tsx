import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import ShareIcon from "@material-ui/icons/Share";
import EditIcon from "@material-ui/icons/Edit";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SmallCircleIcon from "../../common/SmallCircleIcon";
import ViewerMap from "./ViewerMap";
import UserJustifications from "./UserJustifications";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      padding: 24,
      textAlign: "center"
    },
    rating: {
      marginTop: theme.spacing(1),
      fontSize: 72
    }
  })
);

const FactCheck = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <section id="#truth-rating">
        <Typography gutterBottom variant="h4" component="h2">
          User Truth Rating
        </Typography>
        <Rating name="truth-score" className={classes.rating} defaultValue={0} precision={0.1} size="large" readOnly />
        <div className="button-row">
          <Button className="iconic-text-button" variant="contained" color="primary" disableElevation>
            <ShareIcon /> &nbsp;Share
          </Button>
          <Button className="iconic-text-button" variant="contained" color="primary" disableElevation>
            <EditIcon /> &nbsp;Edit Your Opinion
          </Button>
          <Button className="iconic-text-button" variant="contained" color="primary" disableElevation>
            <FavoriteIcon /> &nbsp;Save as Bookmark
          </Button>
        </div>
      </section>
      <hr />
      <section id="#viewer-map">
        <Typography gutterBottom variant="h4" component="h2">
          Top Viewed Countries
        </Typography>
        <Typography variant="subtitle1">
          <div className="grid-row--simple">
            <span>
              <SmallCircleIcon content={1} />
              Canada
            </span>
            <span>
              <SmallCircleIcon content={2} />
              India
            </span>
            <span>
              <SmallCircleIcon content={3} />
              China
            </span>
          </div>
        </Typography>
        <ViewerMap />
      </section>
      <hr />
      <section id="user-justifications">
        <Typography gutterBottom variant="h4" component="h2">
          User Justifications
        </Typography>
        <UserJustifications />
      </section>
    </div>
  );
};

export default FactCheck;
