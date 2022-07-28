export const GetRandomNum = (Min, Max) => {
  const Range = Max - Min;
  const Rand = Math.random();
  return Min + Math.round(Rand * Range);
};

export const NumAdd = (x, y) => {
  return x + y;
};

export const RandomNumArray = (length = 999) => {
  let nums = [];
  const arr = [...Array(length).keys()];
  const res = [];
  while (arr.length) {
    const randomIndex = Math.random() * arr.length - 1;
    res.push(arr.splice(randomIndex, 1)[0]);
  }
  nums = [...nums, ...res];

  return nums;
};
