import React from "react";
import { useIntl } from "react-intl";
import FcHorizontalCard from "../../common/FcHorizontalCard";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Grid, Typography, Chip, Button } from "@material-ui/core";
import DescriptionIcon from "@material-ui/icons/Description";
import CodeIcon from "@material-ui/icons/Code";
import AppsIcon from "@material-ui/icons/Apps";
import GitHubIcon from "@material-ui/icons/GitHub";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import documents from "../../static/data/documents";
import apps from "../../static/data/applications";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > div": {
        marginBottom: theme.spacing(2),
      },
    },
    documents: {
      "& > *": {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        marginRight: "auto",
        textTransform: "none",
      },
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    mondayInstall: {
      marginTop: theme.spacing(1),
    },
  })
);

const FactiblyAppPanel = () => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <section id="factibly-apps" className={classes.root}>
      <Typography gutterBottom variant="h4" component="h2">
        {intl.formatMessage({ id: "mission.applications" })}
      </Typography>
      <div className={classes.documents}>
        {documents.map(({ href, nameId }) => (
          <Button
            key={`document-button-${nameId}`}
            variant="outlined"
            startIcon={<DescriptionIcon />}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            fullWidth
          >
            {intl.formatMessage({ id: nameId })}
          </Button>
        ))}
      </div>
      <Grid container direction="row" spacing={3}>
        {apps.map(app => {
          const actions = [
            { href: app.productionUrl, nameId: "mission.applications.application", Icon: AppsIcon },
            { href: app.sourceCodeUrl, nameId: "mission.applications.sourceCode", Icon: GitHubIcon },
            { href: app.wireframesUrl, nameId: "mission.applications.wireframes", Icon: PhotoLibraryIcon },
          ];
          return (
            <Grid item key={`factibly-app-${app.internalName}`} xs={12} sm={6}>
              <FcHorizontalCard
                header={
                  <>
                    <b>{app.marketingName}</b>
                    <br />
                    {app.internalName}
                  </>
                }
                body={
                  <>
                    {app.description}
                    {app.points && (
                      <ul>
                        {app.points.map((v, i) => (
                          <li key={`${app.internalName}-point-${i}`}>{v}</li>
                        ))}
                      </ul>
                    )}
                  </>
                }
                bodyComponent="div"
                extra={
                  <>
                    <div>
                      {app.techStack.map((content: string) => (
                        <Chip key={content} className={classes.chip} icon={<CodeIcon />} label={content} />
                      ))}
                    </div>
                    {app.internalName === "fc-monday" && (
                      <div className={classes.mondayInstall}>
                        <a href="https://auth.monday.com/oauth2/authorize?client_id=531eed8d176c2b24bfe94a21f9213f15&response_type=install">
                          <img
                            alt="Add to monday.com"
                            height="42"
                            src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/uploads/Tal/4b5d9548-0598-436e-a5b6-9bc5f29ee1d9_Group12441.png"
                          />
                        </a>
                      </div>
                    )}
                  </>
                }
                actions={actions}
                style={{ height: "100%" }}
              />
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default React.memo(FactiblyAppPanel);
