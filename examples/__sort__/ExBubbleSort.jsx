import React from "react";
import bubbleSort from "/originLib/arithmetic/sorts/bubbleSort";
import { RandomNumArray } from "../../originLib/utils/generate";

function ExBubbleSort() {
  const startSort = () => {
    const arr = RandomNumArray();
    const start = Date.now();
    const result = bubbleSort(arr);
    const end = Date.now();
    console.log(result);
    console.log("用时：", end - start, " ms");
  };

  return (
    <>
      <button id="btn" onClick={startSort}>
        开始冒泡排序
      </button>
    </>
  );
}

export default ExBubbleSort;
