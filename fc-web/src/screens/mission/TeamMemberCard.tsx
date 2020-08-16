import React from "react";
import { FormattedMessage } from "react-intl";
import { useTheme } from "@material-ui/core/styles";
import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import "../../styles/smooth-scroll.css";

function parseMemberImgPath(_: TemplateStringsArray, sub: string) {
  const nameBreakdown: string[] = sub.toLowerCase().split(" ");
  return `./images/${nameBreakdown[0]}-${nameBreakdown[1]}.jpg`;
}

const TeamMemberAction = ({ member }) => {
  const { website, linkedin, github, instagram } = member;
  const sites = [
    [website, "mission.team.action.website", LinkIcon],
    [linkedin, "mission.team.action.linkedin", LinkedInIcon],
    [github, "mission.team.action.github", GitHubIcon],
    [instagram, "mission.team.action.instagram", InstagramIcon],
  ];
  return (
    <>
      {sites.map(site => {
        const [url, id, Icon] = site;
        return (
          url.trim() && (
            <div key={id}>
              <Button
                startIcon={<Icon />}
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                style={{ textTransform: "none" }}
              >
                <FormattedMessage id={id} />
              </Button>
            </div>
          )
        );
      })}
    </>
  );
};

const TeamMemberCard = ({ member }) => {
  const theme = useTheme();
  return (
    <Grid key={member.name} item>
      <Card style={{ padding: theme.spacing(3) }}>
        <CardMedia title={member.name} image={parseMemberImgPath`${member.name}`} style={{ width: 240, height: 240 }} />
        <CardContent>
          <Typography gutterBottom style={{ textAlign: "center" }}>
            <b>{member.name}</b> <br />
            <FormattedMessage id={member.role} />
          </Typography>
        </CardContent>
        <TeamMemberAction member={member} />
      </Card>
    </Grid>
  );
};

export default TeamMemberCard;
