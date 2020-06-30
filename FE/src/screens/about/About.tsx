import React, { useState, useLayoutEffect, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import ScrollMagic from "scrollmagic";
import { isBrowser } from "react-device-detect";
import TeamMemberCard from "./TeamMemberCard";
import { withStyles, Theme } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import CodeIcon from "@material-ui/icons/Code";
import GitHubIcon from "@material-ui/icons/GitHub";
import DescriptionIcon from "@material-ui/icons/Description";
import BounceDownArrow from "../../common/BounceDownArrow";
import members from "../../text/members";
import "../../styles/smooth-scroll.css";
import "../../styles/universal.css";

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 14
  }
}))(Tooltip);

const CompanyIntroduction = () => (
  <section id="trigger1">
    <Typography gutterBottom variant="h4" component="h2">
      <FormattedMessage id="companyName" />
    </Typography>
    <div>
      Founded in 2020, Sapphire Labs strives for excellence through innovation. With the current socio-political climate
      around the world, fake news &mdash; that is, unbalanced non-evidence-based news &mdash; has spread like a wildlife
      across the World Wide Web. Many people have been persuaded by these fake news, especially as fake news have become
      increasingly more difficult to discern from real news. Indeed, the United Nations has&nbsp;
      <Link href="https://www.un.org/en/un-coronavirus-communications-team/un-tackling-%E2%80%98infodemic%E2%80%99-misinformation-and-cybercrime-covid-19">
        acknowledged
      </Link>
      &nbsp;an "infodemic" of misinformation. These fake news have widespread implications for us all. They erode the
      public's trust in scientists and political leaders, which has been evident throughout the COVID-19 pandemic. They
      harm the reputation of individuals and businesses alike. They create echo chambers on social media. They divide
      communities and countries, and create an atmosphere of "us vs them". To this end, we created this service for
      <ul>
        <li>people who are not sure whether something they've read or heard is factual or fictious </li>
        <li>businesses that want to observe how their reputation may be affected by the presence of fake news</li>
      </ul>
    </div>
    <BounceDownArrow />
  </section>
);

const CompanyTeam = () => (
  <section id="trigger2">
    <Typography gutterBottom variant="h4" component="h2">
      <FormattedMessage id="teamHeader" />
    </Typography>
    <Grid container wrap={isBrowser ? "nowrap" : "wrap"} spacing={5}>
      {members.map(member => (
        <TeamMemberCard key={member.name} member={member} />
      ))}
    </Grid>
    <BounceDownArrow />
  </section>
);

const CompanyTechStack = () => {
  const chipStyling = { margin: "5px" };
  const buttonStyling: React.CSSProperties = {
    display: "inline-block",
    width: 300,
    marginRight: "auto",
    textTransform: "none"
  };
  const iconStyling = { width: 32, height: 32 };
  return (
    <section id="trigger3" className="paragraphed-container">
      <Typography gutterBottom variant="h4" component="h2">
        <FormattedMessage id="techStackHeader" />
      </Typography>
      <div>
        <b>
          <FormattedMessage id="frontEndHeader" />
        </b>
        <div>
          {[
            "TypeScript",
            "React",
            "Redux",
            "Material UI",
            "Bootstrap",
            "Format.JS",
            "Formik",
            "Anime.js",
            "Scroll Magic"
          ].map(element => (
            <Chip key={element} icon={<CodeIcon />} label={element} style={chipStyling} />
          ))}
        </div>
      </div>
      <div>
        <b>
          <FormattedMessage id="backEndHeader" />
        </b>
        <div>
          {["Python", "Django", "GraphQL", "PostgreSQL"].map(element => (
            <Chip key={element} icon={<CodeIcon />} label={element} style={chipStyling} />
          ))}
        </div>
      </div>
      <div>
        <LightTooltip
          placement="right"
          title="Explore the source code for this website on GitHub – updated occasionally"
        >
          <Button
            variant="contained"
            href="https://github.com/Sapphire-Labs/Hackathon"
            target="_blank"
            rel="noreferrer noopener"
            startIcon={<GitHubIcon style={iconStyling} />}
            style={buttonStyling}
          >
            <FormattedMessage id="sourceCode" />
          </Button>
        </LightTooltip>
      </div>
      <div>
        <LightTooltip
          placement="right"
          title="View the entity relationship diagram and get a good overview of the structure of our PostgresSQL database"
        >
          <Button
            variant="contained"
            href="https://app.lucidchart.com/invitations/accept/527e1e63-d836-49d4-8b2e-c389c2294a27"
            target="_blank"
            rel="noreferrer noopener"
            startIcon={<DescriptionIcon style={iconStyling} />}
            style={buttonStyling}
          >
            <FormattedMessage id="erd" />
          </Button>
        </LightTooltip>
      </div>
    </section>
  );
};

const About = () => {
  const [, setActiveWindowWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    window.addEventListener("resize", () => {
      setActiveWindowWidth(window.innerWidth);
      window.location.reload(false);
    });
  });

  useEffect(() => {
    // You'll need to refresh the page when changing between browser and non-browser modes
    if (isBrowser) {
      const controller: ScrollMagic.Controller = new ScrollMagic.Controller({
        globalSceneOptions: { triggerHook: "onLeave" }
      });
      ["#trigger1", "#trigger2", "#trigger3"].forEach(triggerElement => {
        new ScrollMagic.Scene({ triggerElement }).setPin(triggerElement).addTo(controller);
      });
    }
  });

  return (
    <div>
      <CompanyIntroduction />
      <CompanyTeam />
      <CompanyTechStack />
    </div>
  );
};

export default About;
