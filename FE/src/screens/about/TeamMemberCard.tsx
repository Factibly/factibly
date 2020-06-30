import React from "react";
import { FormattedMessage } from "react-intl";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import LinkIcon from "@material-ui/icons/Link";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import "../../styles/smooth-scroll.css";
import "../../styles/universal.css";

function parseMemberImgPath(str: TemplateStringsArray, sub: string) {
  const nameBreakdown: string[] = sub.toLowerCase().split(" ");
  return `./images/${nameBreakdown[0]}-${nameBreakdown[1]}.jpg`;
}

const TeamMemberAction = ({ member }) => {
  const { website, linkedin, github } = member;
  const ibClass = "textual-icon-button";
  return (
    <>
      {website.trim() && (
        <div>
          <IconButton className={ibClass} href={website} target="_blank" rel="noreferrer noopener">
            <LinkIcon />
            <div>
              &nbsp;
              <FormattedMessage id="website" />
            </div>
          </IconButton>
        </div>
      )}
      {linkedin.trim() && (
        <div>
          <IconButton className={ibClass} href={linkedin} target="_blank" rel="noreferrer noopener">
            <LinkedInIcon />
            <div>
              &nbsp;
              <FormattedMessage id="linkedin" />
            </div>
          </IconButton>
        </div>
      )}
      {github.trim() && (
        <div>
          <IconButton className={ibClass} href={github} target="_blank" rel="noreferrer noopener">
            <GitHubIcon />
            <div> &nbsp;GitHub </div>
          </IconButton>
        </div>
      )}
    </>
  );
};

const TeamMemberCard = ({ member }) => {
  return (
    <Grid key={member.name} item>
      <Card style={{ padding: 24 }}>
        <CardMedia title={member.name} image={parseMemberImgPath`${member.name}`} style={{ width: 240, height: 240 }} />
        <CardContent>
          <Typography gutterBottom style={{ textAlign: "center" }}>
            <b>{member.name}</b> <br />
            {member.role}
          </Typography>
        </CardContent>
        <TeamMemberAction member={member} />
      </Card>
    </Grid>
  );
};

export default TeamMemberCard;
