export const GetRandomNum = (Min, Max) => {
  const Range = Max - Min;
  const Rand = Math.random();
  return Min + Math.round(Rand * Range);
};

export const NumAdd = (x, y) => {
  return x + y;
};
