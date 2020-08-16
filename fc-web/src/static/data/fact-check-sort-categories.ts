import { SortCategories } from "../../common/Sorter";

const sortCategories: SortCategories = [
  {
    nameId: "factCheck.userRatings.action.sort.mostRecent",
    comparator: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  },
  {
    nameId: "factCheck.userRatings.action.sort.mostUpvotes",
    comparator: (a, b) => b.upvoteCount - a.upvoteCount,
  },
  {
    nameId: "factCheck.userRatings.action.sort.mostDownvotes",
    comparator: (a, b) => Math.abs(b.downvoteCount) - Math.abs(a.downvoteCount),
  },
];

export default sortCategories;
