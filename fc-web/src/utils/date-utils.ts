import { IntlShape } from "react-intl";

export const formatAsDaysAgo = function formatAsDaysAgo(
  referenceDate: Date,
  intl: IntlShape,
  limit: number = 14
): string {
  const currentDate = new Date();
  const daysAgo = Math.ceil((currentDate.getTime() - new Date(referenceDate).getTime()) / (1000 * 3600 * 24));
  return daysAgo <= limit
    ? intl.formatMessage({ id: "general.unit.daysAgo.name" }, { daysAgo })
    : intl.formatDate(referenceDate, { year: "numeric", month: "long", day: "numeric" });
};
