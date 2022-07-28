function quickSort(arr) {
  return _quickSort(arr, 0, arr.length - 1);
}

function _quickSort(arr, left, right) {
  if (arr.length < 2) {
    return arr;
  }
  if (left < right) {
    // 最右边的数值
    let x = arr[right];
    let i = left - 1;
    let temp;
    for (let j = left; j <= right; j++) {
      if (arr[j] <= x) {
        i++;
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
    _quickSort(arr, left, i - 1);
    _quickSort(arr, i + 1, right);
  }
  return arr;
}

export default quickSort;
