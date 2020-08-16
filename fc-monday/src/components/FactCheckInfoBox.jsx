import React from "react";
import { useIntl } from "react-intl";
import { Box, List, ListItem, ListItemText, Typography } from "@material-ui/core";

const FactCheckInfoBox = ({ contentId, boardId, boardName, boardItemId, boardItemName }) => {
  const intl = useIntl();

  return (
    <Box pv={3} ph={1}>
      <List id="fact-check-modal-description">
        {[
          ["factCheck.id", contentId],
          ["monday.board.id", boardId],
          ["monday.board.name", boardName],
          ["monday.board.item.id", boardItemId],
          ["monday.board.item.name", boardItemName],
        ].map(([labelId, data]) => (
          <ListItem key={`fact-check-info-${labelId}`}>
            <ListItemText
              primary={
                <>
                  {intl.formatMessage({ id: labelId })}
                  <wbr />
                  <Typography color="textSecondary">{data}</Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FactCheckInfoBox;
