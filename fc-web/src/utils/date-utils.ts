export const formatAsDaysAgo = function formatAsDaysAgo(
  referenceDate: Date,
  getDaysAgoMsg: (daysAgo: number) => string,
  getAbsoluteDateMsg: (date: Date) => string,
  limit: number = 14
): string {
  const currentDate = new Date();
  const daysAgo = Math.ceil((currentDate.getTime() - new Date(referenceDate).getTime()) / (1000 * 3600 * 24));
  return daysAgo <= limit ? getDaysAgoMsg(daysAgo) : getAbsoluteDateMsg(referenceDate);
};
