import React from "react";
import quickSort from "/originLib/arithmetic/sorts/quickSort";
import { RandomNumArray } from "../../originLib/utils/generate";

function ExQuickSort() {
  const startSort = () => {
    const arr = RandomNumArray();
    const start = Date.now();
    const result = quickSort(arr);
    const end = Date.now();
    console.log(result);
    console.log("用时：", end - start, " ms");
  };

  return (
    <>
      <button id="btn" onClick={startSort}>
        开始快速排序
      </button>
    </>
  );
}

export default ExQuickSort;
