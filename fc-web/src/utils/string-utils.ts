export const parseAsSpaced = function parseAsSpaced(
  str: string,
  delimiter: string = "-",
  capitalize: boolean = false,
  parseWordLimit: number = -1
) {
  const parsedBreakdown: string[] = str.toLowerCase().split(delimiter);
  const reducer = (acculumator: string, currentValue: string) => {
    const next = capitalize ? currentValue.charAt(0).toUpperCase() + currentValue.slice(1) : currentValue;
    return `${acculumator} ${next}`;
  };
  // Array.prototype.slice() handles any indices that are out of bounds within the array and
  //  can accept -ve numbers, in which case the method would traverse the array from the right
  // String.prototype.trim() ensures that the parsed string is space delimited at the start and end
  const delimited = parsedBreakdown.reduce(reducer).slice(0, parseWordLimit).trim();
  return delimited;
};
