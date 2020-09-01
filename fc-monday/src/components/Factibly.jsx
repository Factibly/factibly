import React from "react";
import FactCheckCard from "./FactCheckCard";
import Grid from "@material-ui/core/Grid";
import { SortableContainer } from "react-sortable-hoc";
import { chunk } from "lodash";

const chunkSize = 3;

const Factibly = SortableContainer(({ boardData, showImage }) => {
  return (
    <div style={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {chunk(boardData, chunkSize).map((chunk, i1) =>
          chunk.map(({ boardId, boardItemId, url }, i2) => {
            const order = chunkSize * i1 + i2;
            return (
              <FactCheckCard
                key={`fact-check-${boardItemId}`}
                index={order}
                boardId={boardId}
                boardItemId={boardItemId}
                url={url}
                showImage={showImage}
              />
            );
          })
        )}
      </Grid>
    </div>
  );
});

export default Factibly;
