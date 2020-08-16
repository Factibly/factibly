import React, { useState } from "react";
import { useIntl } from "react-intl";
import { isBrowser } from "react-device-detect";
import StyledMenu from "../../common/StyledMenu";
import DropdownMenuItem from "../../common/DropdownMenuItem";
import TextActionBar from "../../common/TextActionBar";
import FactCheckWidgetEditor from "./widget/FactCheckWidgetEditor";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faLink } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "../../hooks/useAlert";
import socialMedia from "../../static/data/social-media";

interface FactCheckShareMenuProps {
  anchorEl: HTMLElement | null;
  onCloseShareMenu: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuPaper: {
      minWidth: 320,
      border: `2px solid ${theme.palette.action.active}`,
    },
    copyEmbedAdornment: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
  })
);

const FactCheckShareMenu = ({ anchorEl, onCloseShareMenu }: FactCheckShareMenuProps) => {
  const classes = useStyles();
  const intl = useIntl();

  const [, setAlert] = useAlert();

  const [openWidgetEditor, setOpenWidgetEditor] = useState<boolean>(false);
  const handleOpenWidgetEditor = () => setOpenWidgetEditor(true);
  const handleCloseWidgetEditor = () => setOpenWidgetEditor(false);

  const handleCopyFactCheckUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setAlert({
      severity: "success",
      message: intl.formatMessage({ id: "factCheck.widget.alert.msg.linkCopied" }),
    });
  };

  const handleOpenShareWindow = (starter: string, urlParamName: string, ...otherQueryParams: string[]) => {
    window.open(
      `${starter}?${urlParamName}=${process.env.REACT_APP_SHARE_DEFAULT_URL ?? window.location.href}&` +
        otherQueryParams.map(encodeURI).join("&")
    );
  };

  return (
    <>
      <StyledMenu
        classes={{ paper: classes.menuPaper }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onCloseShareMenu}
      >
        <DropdownMenuItem
          primary={
            <>
              <div>
                <FontAwesomeIcon icon={faLink} />
                &nbsp;&nbsp;{intl.formatMessage({ id: "factCheck.overview.action.share.factCheckUrl" })}
              </div>
              <TextActionBar
                value={window.location.href}
                actionName={intl.formatMessage({ id: "general.action.copy" })}
                onClick={handleCopyFactCheckUrl}
                aria-label={intl.formatMessage({ id: "factCheck.overview.action.share.factCheckUrl.aria" })}
              />
            </>
          }
          disableRipple
          disableFocusRipple
          disableTouchRipple
        />
        <DropdownMenuItem
          primary={intl.formatMessage({ id: "general.action.embed" })}
          icon={<FontAwesomeIcon icon={faCode} size="lg" />}
          onClick={handleOpenWidgetEditor}
        />
        {Object.values(socialMedia(isBrowser, window.location.href, "Fake Check", "")).map(
          ({ nameId, nameDefault, icon, starter, urlQueryParamKey, otherQueryParams }) => (
            <DropdownMenuItem
              key={`social-share-${nameDefault}`}
              primary={intl.formatMessage({ id: nameId, defaultMessage: nameDefault })}
              icon={<FontAwesomeIcon icon={icon} size="lg" />}
              onClick={() => handleOpenShareWindow(starter, urlQueryParamKey, otherQueryParams)}
            />
          )
        )}
      </StyledMenu>
      <FactCheckWidgetEditor open={openWidgetEditor} onClose={handleCloseWidgetEditor} />
    </>
  );
};

export default FactCheckShareMenu;
