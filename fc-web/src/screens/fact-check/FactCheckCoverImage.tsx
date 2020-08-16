import React, { useState } from "react";
import { useIntl } from "react-intl";
import CenteredDivAbs from "../../common/CenteredDivAbs";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { ImageModerationScore } from "../../static/enums";

interface FactCheckCoverImageProps {
  sourceTitle: string;
  imageUrl: string | null;
  imageModerationScore: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    relativeGrid: {
      position: "relative",
      marginBottom: theme.spacing(2),
    },
    coverImage: {
      height: "50vh",
      width: "100%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
    },
  })
);

const FactCheckCoverImage = ({ sourceTitle, imageUrl, imageModerationScore }: FactCheckCoverImageProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const [nfsw, setNsfw] = useState<boolean>(imageModerationScore === ImageModerationScore.WARNING);
  const handleShowCoverClick = () => setNsfw(false);

  return (
    <>
      {imageUrl && imageModerationScore !== ImageModerationScore.NO_SHOW && (
        <Grid container item className={classes.relativeGrid} alignItems="center" justify="center">
          <div
            className={classes.coverImage}
            style={{
              backgroundImage: `url(${imageUrl})`,
              filter: nfsw ? "blur(2rem)" : undefined,
            }}
            aria-label={intl.formatMessage({ id: "factCheck.coverImage.aria" }, { sourceTitle })}
          />
          {imageUrl && nfsw && (
            <CenteredDivAbs>
              <Typography variant="h5" style={{ textTransform: "uppercase" }}>
                {intl.formatMessage({ id: "factCheck.coverImage.explicitContent.msg" })}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleShowCoverClick}
                style={{ textTransform: "none" }}
              >
                {intl.formatMessage({ id: "factCheck.coverImage.explicitContent.action.show" })}
              </Button>
            </CenteredDivAbs>
          )}
        </Grid>
      )}
    </>
  );
};

export default FactCheckCoverImage;
