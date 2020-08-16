import { SortCategories } from "../../common/Sorter";

const sortCategories: SortCategories = [
  {
    nameId: "bookmarks.bookmark.action.sort.alpha.std",
    comparator: (a, b) => a.title.localeCompare(b.title),
  },
  {
    nameId: "bookmarks.bookmark.action.sort.alpha.reverse",
    comparator: (a, b) => b.title.localeCompare(a.title),
  },
];

export default sortCategories;
