import React from "react";
import { useIntl } from "react-intl";
import { isBrowser } from "react-device-detect";
import TeamMemberCard from "./TeamMemberCard";
import BounceDownArrow from "../../common/BounceDownArrow";
import { Typography, Grid } from "@material-ui/core";
import members from "../../static/data/members";

const CompanyTeam = () => {
  const intl = useIntl();

  return (
    <>
      <Typography gutterBottom variant="h4" component="h2">
        {intl.formatMessage({ id: "mission.team.title" })}
      </Typography>
      <Grid container wrap={isBrowser ? "nowrap" : "wrap"} spacing={5}>
        {members.map(member => (
          <TeamMemberCard key={member.name} member={member} />
        ))}
      </Grid>
      <BounceDownArrow />
    </>
  );
};

export default CompanyTeam;
