import React from "react";
import { useIntl } from "react-intl";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import LinkIcon from "@material-ui/icons/Link";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import members from "../../static/data/members";
import FcHorizontalCard from "../../common/FcHorizontalCard";

const FactiblyTeamPanel = () => {
  const intl = useIntl();

  return (
    <section id="factibly-team">
      <Typography gutterBottom variant="h4" component="h2">
        {intl.formatMessage({ id: "mission.team" })}
      </Typography>
      <Grid container direction="column" wrap="wrap" spacing={3}>
        {members.map(member => {
          const sites = [
            { href: member.website, nameId: "mission.team.action.website", Icon: LinkIcon },
            { href: member.instagram, nameId: "mission.team.action.instagram", Icon: InstagramIcon },
            { href: member.linkedin, nameId: "mission.team.action.linkedin", Icon: LinkedInIcon },
            { href: member.github, nameId: "mission.team.action.github", Icon: GitHubIcon },
          ];

          return (
            <Grid item key={member.name}>
              <FcHorizontalCard
                img={<img src={`/images/${member.img}`} alt={member.name} width={240} height={240} />}
                header={
                  <>
                    <b>{member.name}</b>
                    <br />
                    {intl.formatMessage({ id: member.roleId })}
                  </>
                }
                body={member.bio}
                actions={sites}
              />
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default React.memo(FactiblyTeamPanel);
