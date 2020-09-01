import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import monday from "../libs/monday";
import FactCheckInfoBox from "./FactCheckInfoBox";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Paper, Typography, IconButton, Tooltip, Popover } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LaunchIcon from "@material-ui/icons/Launch";
import CloseIcon from "@material-ui/icons/Close";
import { ITEMS } from "../gql/monday";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    position: "absolute",
    height: "90%",
    width: "90%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  left: {
    display: "inline-block",
    width: "49%",
    textAlign: "left",
  },
  right: {
    display: "inline-block",
    width: "50%",
    textAlign: "right",
  },
  iframe: {
    height: "85%",
    width: "100%",
  },
}));

const FactCheckModal = ({ contentId, boardId, boardItemId, open, onClose }) => {
  const classes = useStyles();
  const intl = useIntl();

  const handleOpenMondayItem = () => monday.execute("openItemCard", { itemId: boardItemId });
  const factCheckUrl = `${process.env.REACT_APP_FACTIBLY_BASE_URL}/content/${contentId}`;

  const [anchorElInfoPopover, setAnchorElInfoPopover] = useState(null);
  const handleOpenInfoPopover = event => setAnchorElInfoPopover(event.currentTarget);
  const handleCloseInfoPopover = () => setAnchorElInfoPopover(null);
  const openInfoPopover = Boolean(anchorElInfoPopover);
  const infoPopoverId = openInfoPopover ? "fact-check-information-popover" : undefined;

  const [boardItemData, setBoardItemData] = useState({});

  useEffect(() => {
    monday
      .api(ITEMS, { variables: { itemIds: [parseInt(boardItemId)] } })
      .then(res =>
        res.data?.items?.forEach(({ name: boardItemName, board }) =>
          setBoardItemData({ boardItemName, boardName: board.name })
        )
      );
  }, [boardItemId]);

  return (
    <>
      <Modal
        className={classes.modal}
        open={open}
        onClose={onClose}
        aria-labelledby="fact-check-modal-title"
        aria-describedby="fact-check-modal-description"
      >
        <Paper className={classes.paper}>
          <Typography id="fact-check-modal-title" variant="h4" component="h3">
            <span className={classes.left}> {intl.formatMessage({ id: "factCheck.title" })} </span>
            <div className={classes.right}>
              <Tooltip title={intl.formatMessage({ id: "factCheck.action.info" })}>
                <IconButton
                  color="primary"
                  onClick={handleOpenInfoPopover}
                  aria-label={intl.formatMessage({ id: "factCheck.action.info.aria" })}
                  aria-describedby={infoPopoverId}
                >
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={intl.formatMessage({ id: "factCheck.action.monday.open" })}>
                <IconButton
                  color="primary"
                  onClick={handleOpenMondayItem}
                  aria-label={intl.formatMessage({ id: "factCheck.action.monday.open.aria" })}
                >
                  <AssignmentIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={intl.formatMessage({ id: "factCheck.action.factibly.open" })}>
                <IconButton
                  color="primary"
                  href={factCheckUrl}
                  target="_blank"
                  rel="noopener"
                  aria-label={intl.formatMessage({ id: "factCheck.action.factibly.open.aria" })}
                >
                  <LaunchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={intl.formatMessage({ id: "factCheck.action.modal.close" })}>
                <IconButton
                  color="primary"
                  onClick={onClose}
                  aria-label={intl.formatMessage({ id: "factCheck.action.modal.close.aria" })}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Typography>
          <iframe className={classes.iframe} src={factCheckUrl} title={`Fact Check ${contentId}`} />
        </Paper>
      </Modal>
      <Popover
        id={infoPopoverId}
        open={openInfoPopover}
        anchorEl={anchorElInfoPopover}
        onClose={handleCloseInfoPopover}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <FactCheckInfoBox
          contentId={contentId}
          boardId={boardId}
          boardName={boardItemData.boardName}
          boardItemId={boardItemId}
          boardItemName={boardItemData.boardItemName}
        />
      </Popover>
    </>
  );
};

export default FactCheckModal;
