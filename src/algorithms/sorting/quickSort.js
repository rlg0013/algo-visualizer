function partition(arr, low, high, steps) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    steps.push({
      type: "compare",
      indices: [j, high]
    });

    if (arr[j] < pivot) {
      i++;

      [arr[i], arr[j]] = [arr[j], arr[i]];

      steps.push({
        type: "swap",
        indices: [i, j],
        array: [...arr]
      });
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];

  steps.push({
    type: "swap",
    indices: [i + 1, high],
    array: [...arr]
  });

  steps.push({
    type: "markSorted",
    index: i + 1
  });

  return i + 1;
}

function quickSort(inputArray) {
  const arr = [...inputArray];
  const steps = [];

  function sort(low, high) {
    if (low >= high) return;

    const pi = partition(arr, low, high, steps);

    sort(low, pi - 1);
    sort(pi + 1, high);
  }

  sort(0, arr.length - 1);

  return steps;
}

export default quickSort;
