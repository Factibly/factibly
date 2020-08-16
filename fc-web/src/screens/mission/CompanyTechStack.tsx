import React from "react";
import { useIntl } from "react-intl";
import LightTooltip from "../../common/LightTooltip";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Typography, Button, Chip } from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import developments from "../../static/data/developments";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      margin: theme.spacing(0.5),
    },
    button: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      width: 296,
      marginRight: "auto",
      textTransform: "none",
    },
  })
);

const CompanyTechStack = () => {
  const classes = useStyles();
  const intl = useIntl();

  const createChip = (content: string) => (
    <Chip key={content} className={classes.chip} icon={<CodeIcon />} label={content} />
  );

  return (
    <>
      <Typography gutterBottom variant="h4" component="h2">
        {intl.formatMessage({ id: "mission.techStack.title" })}
      </Typography>
      <div>
        <b> {intl.formatMessage({ id: "mission.techStack.frontEnd.title" })} </b>
        <div>
          {[
            "TypeScript",
            "React",
            "Redux",
            "Apollo",
            "Material-UI",
            "React Router",
            "Format.JS",
            "Lodash",
            "Jest",
            "Enzyme",
          ].map(createChip)}
        </div>
      </div>
      <div>
        <b> {intl.formatMessage({ id: "mission.techStack.backEnd.title" })} </b>
        <div>{["Python", "Django", "Graphene", "PostgreSQL"].map(createChip)}</div>
      </div>
      {Object.values(developments).map(({ tipText, url, Icon, contentText }, index) => {
        return (
          <div key={`tech-development-${index}`}>
            <LightTooltip placement="right" title={intl.formatMessage({ id: tipText })}>
              <Button
                className={classes.button}
                startIcon={<Icon style={{ width: 32, height: 32 }} />}
                variant="contained"
                color="primary"
                href={url}
                target="_blank"
                rel="noreferrer noopener"
              >
                {intl.formatMessage({ id: contentText })}
              </Button>
            </LightTooltip>
          </div>
        );
      })}
    </>
  );
};

export default CompanyTechStack;
