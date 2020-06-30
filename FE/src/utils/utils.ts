export const parseAsSpaced = function(str: string, delimiter: string = "-", parseWordLimit: number = -1) {
  const parsedBreakdown: string[] = str.toLowerCase().split(delimiter);
  if (parseWordLimit === -1 || parseWordLimit === parsedBreakdown.length) {
    return str.replaceAll(delimiter, " ");
  } else {
    const reducer = (acculumator: string, currentValue: string) => {
      return `${acculumator} ${currentValue}`;
    };
    // Array.prototype.slice() handles any indices that are out of bounds within the array and
    // can accept -ve numbers, in which case the method would traverse the array from the right
    const delimited = parsedBreakdown
      .reduce(reducer)
      .slice(0, parseWordLimit)
      .trim(); // use String.prototype.trim() as the parsed string needs to be space delimited
    return delimited;
  }
};

export const parseAsSpacedCapitalized = function(str: string, delimiter: string = "-", parseWordLimit: number = -1) {
  const parsedBreakdown: string[] = str.toLowerCase().split(delimiter);
  if (parsedBreakdown.length === 0) {
    return (str.charAt(0).toUpperCase() + str.slice(1)).trim();
  } else {
    const reducer = (acculumator: string, currentValue: string) => {
      return `${acculumator} ${currentValue.charAt(0).toUpperCase() + currentValue.slice(1)}`;
    };
    // Array.prototype.slice() handles any indices that are out of bounds within the array and
    // can accept -ve numbers, in which case the method would traverse the array from the right
    const delimited = parsedBreakdown
      .reduce(reducer)
      .slice(0, parseWordLimit)
      .trim(); // use String.prototype.trim() as the parsed string needs to be space delimited
    return delimited;
  }
};

export const isLoggedIn = (): boolean => {
  return "auth_token" in localStorage;
};
