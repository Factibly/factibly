import React from "react";
import { useIntl } from "react-intl";
import { isBrowser } from "react-device-detect";
import StyledMenu from "../../common/StyledMenu";
import DropdownMenuItem from "../../common/DropdownMenuItem";
import { makeStyles, createStyles, Theme, useTheme } from "@material-ui/core/styles";
import { Typography, IconButton, OutlinedInput, InputAdornment } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import socialMedia from "../../text/social-media";

interface ShareMenuProps {
  anchorEl: HTMLElement | null;
  closeMenu: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuPaper: {
      minWidth: 320,
      border: `2px solid ${theme.palette.action.active}`,
    },
    copyEmbedButton: {
      padding: theme.spacing(1),
    },
  })
);

const pageUrl = window.location.href;
const copyPageUrl = () => navigator.clipboard.writeText(pageUrl);
const openShareWindow = (starter: string, urlParamName: string, ...otherParams: string[]) => {
  window.open(
    `${starter}?${urlParamName}=${process.env.REACT_APP_SHARE_DEFAULT_URL ?? pageUrl}&` +
      otherParams.map(encodeURI).join("&")
  );
};

const ShareMenu = ({ anchorEl, closeMenu }: ShareMenuProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const intl = useIntl();

  return (
    <StyledMenu classes={{ paper: classes.menuPaper }} open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={closeMenu}>
      <DropdownMenuItem
        primary={
          <>
            <Typography gutterBottom variant="subtitle2">
              Embed
            </Typography>
            <OutlinedInput
              value={pageUrl}
              endAdornment={
                <InputAdornment variant="standard" position="end">
                  <IconButton
                    className={classes.copyEmbedButton}
                    aria-label="copy iframe page url"
                    disableRipple
                    disableFocusRipple
                    disableTouchRipple
                  >
                    <FontAwesomeIcon icon={faClipboard} />
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{ style: { padding: theme.spacing(1) } }}
              fullWidth
              readOnly
            />
          </>
        }
        onClick={copyPageUrl}
        dense
      />
      {Object.values(socialMedia(isBrowser, "Fake Check")).map(
        ({ nameId, nameDefault, icon, starter, urlParamName, otherParams }) => (
          <DropdownMenuItem
            key={`social-share-${nameDefault}`}
            primary={intl.formatMessage({ id: nameId, defaultMessage: nameDefault })}
            icon={<FontAwesomeIcon icon={icon} size="lg" />}
            onClick={() => openShareWindow(starter, urlParamName, otherParams)}
          />
        )
      )}
    </StyledMenu>
  );
};

export default ShareMenu;
