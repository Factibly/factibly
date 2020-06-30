import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

interface FactCheckQuizzesProps {
  style?: object;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    panelSummary: {
      backgroundColor: "#D3D3D3"
    },
    heading: {
      flexBasis: "33.33%",
      flexShrink: 0
    },
    secondaryHeading: {
      color: theme.palette.text.secondary
    }
  })
);

const FactCheckQuizzes = (props: FactCheckQuizzesProps) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div style={props.style}>
      <ExpansionPanel expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
        <ExpansionPanelSummary
          className={classes.panelSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}> Spot the Fake &mdash; Tinder Edition </Typography>
          <Typography className={classes.secondaryHeading}>
            Identify fake news based on their content and source
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          You will be given 10 news articles. Your job is to identify whether they contain real or fake news. If an
          article contains real news, swipe right; if not, swipe left (please use the swipe right/left buttons, and
          don't actually try to swipe on a touchscreen device). If the article contains some half-truths, employs
          fallacious reasoning or uses evidence that is factual but taken out of context, you should still swipe left.
          We cannot guarantee a Tinder date, but we can guarantee something undoubtedly better: improvements in your
          ability to identify fake news upon completing this quiz with an excellent score.
          <br />
          <br />
          There may be some twists in the articles, so you should remain observant and should consider every aspect of
          the article, including the content, author, publisher, visual aids and UI. Oh, and while we are still on the
          topic of Tinder, you shouldn't cheat on this quiz in the same way you (probably?) shouldn't cheat on your SO.
          <br />
        </ExpansionPanelDetails>
        <Button fullWidth disabled variant="contained" color="primary" style={{ padding: "10px 0px" }}>
          Coming Soon
        </Button>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
        <ExpansionPanelSummary
          className={classes.panelSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}> The Grand Knowledge Test &mdash; SAT Edition </Typography>
          <Typography className={classes.secondaryHeading}>
            Put your knowledge of detecting fake news to the test
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          Just like a CollegeBoard SAT subject test, this quiz contains MC questions, each with 4 options, with 1 point
          rewarded for each correct answer, 1/3 point subtracted for each incorrect answer and 0 point for unanswered
          questions; the points are subsequently scaled such that the maximum mark for this quiz is 800. However, unlike
          the SAT, there's no need to hit up on a $200 textbook and a $2000 tutor, and to memorize a ton of seemingly
          random facts that you could have easily looked up on Google &#128586;.
        </ExpansionPanelDetails>
        <Button fullWidth disabled variant="contained" color="primary" style={{ padding: "12px 0px" }}>
          Coming Soon
        </Button>
      </ExpansionPanel>
      <ExpansionPanel expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
        <ExpansionPanelSummary
          className={classes.panelSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}> Fact Check Detective Training &mdash; COVID-19 Edition </Typography>
          <Typography className={classes.secondaryHeading}> Fight against COVID-19 misinformation </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          While scientists are busy discovering a vaccine against SARS-CoV-2, you should be busy fighting against the
          misinformation on COVID-19. This quiz consists of 10 questions, each with 3 accompanying pieces of text. Your
          job is to eradicate the "fake news virus" (fake-news-CoV-16) by clicking on the pieces that contain fake news
          regarding COVID-19. It's too bad that the coronavirus cannot be eradicated with the press of a button*, but at
          least this quiz should keep you busy during home quarantine.
          <br />
          <br />
          *However, you can help stop its spread by following public health guidelines &#128521;.
        </ExpansionPanelDetails>
        <Button fullWidth disabled variant="contained" color="primary" style={{ padding: "10px 0px" }}>
          Coming Soon
        </Button>
      </ExpansionPanel>
    </div>
  );
};

export default FactCheckQuizzes;
