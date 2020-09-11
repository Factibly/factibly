import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Avatar, CardHeader } from "@material-ui/core";
import ReactCountryFlag from "react-country-flag";
import { formatAsDaysAgo } from "../../../utils/date-utils";

interface FactCheckRatingHeaderProps {
  displayName: string;
  createdAt: Date;
  country?: string;
  disableAvatar?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    countryFlag: {
      fontSize: theme.typography.pxToRem(32),
    },
  })
);

const FactCheckRatingHeader = ({
  displayName,
  createdAt,
  country,
  disableAvatar = false,
}: FactCheckRatingHeaderProps) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <CardHeader
      avatar={
        disableAvatar || (
          <Avatar
            alt={displayName}
            aria-label={intl.formatMessage({ id: "user.avatar.others.aria" }, { displayName })}
          />
        )
      }
      title={displayName}
      subheader={
        createdAt &&
        formatAsDaysAgo(
          createdAt,
          daysAgo => intl.formatMessage({ id: "general.unit.daysAgo" }, { daysAgo }),
          date => intl.formatDate(date, { year: "numeric", month: "long", day: "numeric" })
        )
      }
      subheaderTypographyProps={{ color: "inherit" }}
      action={
        country && (
          <span className={classes.countryFlag}>
            <ReactCountryFlag countryCode={country} svg aria-label={country} />
          </span>
        )
      }
    />
  );
};

export default FactCheckRatingHeader;
