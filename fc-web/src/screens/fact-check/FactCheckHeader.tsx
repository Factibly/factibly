import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

interface FactCheckHeaderProps {
  sourceTitle: string;
  author: string | null | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tag: {
      alignSelf: "flex-start",
      padding: theme.spacing(0.5, 1),
      color: theme.palette.primary.light,
      border: `thin solid ${theme.palette.primary.light}`,
      borderRadius: theme.spacing(2),
    },
    title: {
      textAlign: "left",
      wordWrap: "break-word",
      hyphens: "auto",
      WebkitHyphens: "auto",
      msHyphens: "auto",
    },
  })
);

const FactCheckHeader = ({ sourceTitle, author }: FactCheckHeaderProps) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <>
      <Typography className={classes.tag} gutterBottom>
        {intl.formatMessage({ id: "factCheck.certified.tag" })}
      </Typography>
      <Typography className={classes.title} component="h2" variant="h3" gutterBottom>
        {sourceTitle}
      </Typography>
      <Typography gutterBottom style={{ fontSize: "large" }}>
        {author ? (
          intl.formatMessage({ id: "factCheck.overview.author.by" }, { author })
        ) : (
          <em>{intl.formatMessage({ id: "factCheck.overview.author.unknown" })}</em>
        )}
      </Typography>
    </>
  );
};

export default FactCheckHeader;
