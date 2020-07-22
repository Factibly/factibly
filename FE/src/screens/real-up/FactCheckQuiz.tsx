import React from "react";
import DOMPurify from "dompurify";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Accordion, AccordionSummary, AccordionDetails, Button, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    panelSummary: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.primary.main,
    },
    heading: {
      flexBasis: "33.33%",
      flexShrink: 0,
    },
    secondaryHeading: {
      color: "#D3D3D3",
    },
  })
);

interface FactCheckQuizProps {
  panelId: string;
  expanded: string | false;
  handleChange: (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => void;
  title: string;
  subtitle: string;
  description: string;
}

const FactCheckQuiz = ({ panelId, expanded, handleChange, title, subtitle, description }: FactCheckQuizProps) => {
  const classes = useStyles();
  return (
    <Accordion expanded={expanded === panelId} onChange={handleChange(panelId)}>
      <AccordionSummary
        className={classes.panelSummary}
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${panelId}bh-content`}
        id={`${panelId}bh-header`}
      >
        <Typography className={classes.heading} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }} />
        <Typography
          className={classes.secondaryHeading}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(subtitle) }}
        />
      </AccordionSummary>
      <AccordionDetails>
        <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} />
      </AccordionDetails>
      <Button fullWidth disabled variant="contained" color="primary" style={{ padding: "8px 0" }}>
        Coming Soon
      </Button>
    </Accordion>
  );
};

export default FactCheckQuiz;
