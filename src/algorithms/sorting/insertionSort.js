function insertionSort(inputArray) {
  const array = [...inputArray];
  const steps = [];
  const n = array.length;

  // First element is already sorted
  steps.push({
    type: "markSorted",
    index: 0
  });

  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    steps.push({
      type: "currentMin",
      indices: [i]
    });

    while (j >= 0) {
      steps.push({
        type: "compare",
        indices: [j, j + 1]
      });

      if (array[j] > key) {
        array[j + 1] = array[j];

        steps.push({
          type: "overwrite",
          indices: [j + 1],
          array: [...array]
        });

        j--;
      } else {
        break;
      }
    }

    array[j + 1] = key;

    steps.push({
      type: "overwrite",
      indices: [j + 1],
      array: [...array]
    });

    // Everything from 0 to i is now sorted
    for (let k = 0; k <= i; k++) {
      steps.push({
        type: "markSorted",
        index: k
      });
    }
  }

  return steps;
}

export default insertionSort;
