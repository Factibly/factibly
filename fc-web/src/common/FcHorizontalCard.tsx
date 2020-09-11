import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { Card, CardContent, Typography, Button, Divider, SvgIconTypeMap } from "@material-ui/core";

interface FcHorizontalCardProps {
  img?: React.ReactNode;
  header?: React.ReactNode;
  body?: React.ReactNode;
  bodyComponent?: React.ElementType<any>;
  extra?: React.ReactNode;
  actions?: { href?: string | null; nameId: string; Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> }[];
  style?: React.CSSProperties;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3),
      "@media (min-width: 769px)": {
        display: "flex",
      },
    },
    contentRoot: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
      paddingTop: 0,
      "&:last-child": {
        paddingBottom: 0,
      },
    },
    imgWrapper: {
      "@media (max-width: 768px)": {
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginBottom: theme.spacing(1),
      },
    },
    description: {
      padding: theme.spacing(1, 0),
    },
    divider: {
      margin: theme.spacing(2, 0, 1),
    },
    buttonsWrapper: {
      position: "relative",
      bottom: 0,
    },
    button: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      textTransform: "none",
    },
  })
);

const FcHorizontalCard = ({ img, header, body, bodyComponent = "p", extra, actions, style }: FcHorizontalCardProps) => {
  const classes = useStyles();
  const intl = useIntl();

  return (
    <Card className={classes.root} style={{ ...style }}>
      {img && <div className={classes.imgWrapper}>{img}</div>}
      <CardContent classes={{ root: classes.contentRoot }}>
        <div>
          <Typography gutterBottom align="center">
            {header}
          </Typography>
          <Typography component={bodyComponent} className={classes.description} variant="body2">
            {body}
          </Typography>
        </div>
        <div className={classes.buttonsWrapper}>
          {extra}
          {actions && (
            <>
              <Divider className={classes.divider} />
              {actions.map(
                ({ href, nameId, Icon }) =>
                  href && (
                    <Button
                      key={nameId}
                      className={classes.button}
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      startIcon={<Icon />}
                    >
                      {intl.formatMessage({ id: nameId })}
                    </Button>
                  )
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FcHorizontalCard;
