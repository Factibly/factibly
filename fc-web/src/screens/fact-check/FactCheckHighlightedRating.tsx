import React from "react";
import { useIntl } from "react-intl";
import RatingBreakdownGrid from "./RatingBreakdownGrid";
import { Rating } from "@material-ui/lab";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Avatar, Card, CardHeader, CardContent } from "@material-ui/core";
import ReactCountryFlag from "react-country-flag";

interface FactCheckHighlightedRatingProps {
  user: string;
  updatedAt: Date;
  content: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(3)}px`,
      borderRadius: 16,
      borderWidth: 2,
    },
    content: {
      paddingTop: 0,
      "& > div:not(:last-child)": {
        paddingBottom: theme.spacing(2),
      },
    },
  })
);

const FactCheckHighlightedRating = ({ user, content }: FactCheckHighlightedRatingProps) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card className={classes.root} variant="outlined" elevation={0} raised={false}>
      <CardHeader
        avatar={<Avatar aria-label="user"> AB </Avatar>}
        title={user}
        subheader={intl.formatMessage({ id: "general.unit.daysAgo.name" }, { daysAgo: 3 })}
        action={<ReactCountryFlag countryCode="US" svg style={{ fontSize: 32 }} />}
      />
      <CardContent className={classes.content}>
        <Rating size="large" value={2} precision={0.1} readOnly />
        <div> {content} </div>
        <div>
          <RatingBreakdownGrid scores={[2, 2, 2]} style={{ float: "left" }} />
          <div style={{ float: "right" }}> 1,000 Upvotes </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FactCheckHighlightedRating;
