export const BOARDS = `
  query ($boardIds: [Int]) {
    boards (ids: $boardIds) {
      id
      state
      items (limit:10) {
        id
        name
        column_values {
          title
          text
        }
      }
    }
  }`;

export const ITEMS = `
  query ($itemIds: [Int]) {
    items (ids: $itemIds) {
      name
      board {
        name
      }
    }
  }`;
