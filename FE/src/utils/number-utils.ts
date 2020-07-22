export const findMean = function findMean(nums: number[]) {
  return nums.reduce((a, b) => a + b, 0) / nums.length;
};

export const roundFixedNum = function roundFixedNum(num: number, dp: number = 2) {
  const factor = 10 ** dp;
  return Math.round((num + Number.EPSILON) * factor) / factor;
};
