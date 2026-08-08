function merge(array, left, mid, right, steps) {
  const l1 = mid - left + 1;
  const l2 = right - mid;

  const arr1 = new Array(l1);
  const arr2 = new Array(l2);

  for (let i = 0; i < l1; i++) {
    arr1[i] = array[left + i];
  }

  for (let i = 0; i < l2; i++) {
    arr2[i] = array[mid + 1 + i];
  }

  let i = 0;
  let j = 0;
  let k = left;


  while (i < l1 && j < l2) {
    steps.push({
      type: "compare",
      indices: [left + i, mid + 1 + j],
    });

    if (arr1[i] < arr2[j]) {
      array[k] = arr1[i];

      steps.push({
        type: "overwrite",
        indices: [k],
        array: [...array]
      });

      i++;
    } else {
      array[k] = arr2[j];

      steps.push({
        type: "overwrite",
        indices: [k],
        array: [...array]
      });

      j++;
    }

    k++;
  }

  while (i < l1) {
    array[k] = arr1[i];

    steps.push({
      type: "overwrite",
      indices: [k],
      array: [...array]
    });

    i++;
    k++;
  }

  while (j < l2) {
    array[k] = arr2[j];

    steps.push({
      type: "overwrite",
      indices: [k],
      array: [...array]
    });

    j++;
    k++;
  }
}

function mergeSort(inputArray) {
  const array = [...inputArray];
  const steps = [];

  function sort(left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    sort(left, mid);
    sort(mid + 1, right);

    merge(array, left, mid, right, steps);
  }

  sort(0, array.length - 1);

  return steps;
}

export default mergeSort;
