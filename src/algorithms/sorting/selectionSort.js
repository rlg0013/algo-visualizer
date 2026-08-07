function selectionSort(inputArray) {
  const array = [...inputArray]
  const steps = []
  const n = array.length

  for (let i = 0; i < n - 1; i++){
    let min_idx = i

    steps.push({
      type: "currentMin",
      indices: [min_idx]
    })

    for (let j = i + 1; j < n; j++){
      steps.push({
        type: "compare",
        indices:[min_idx, j]
      })

      if (array[j] < array[min_idx]) {
        min_idx = j;

        steps.push({
          type: "currentMin",
          indices: [min_idx]
        })
      }
    }
    if (min_idx != i) {
      [array[i], array[min_idx]] = [array[min_idx], array[i]]

      steps.push({
        type: "swap",
        indices: [i, min_idx],
        array:[...array]
      })
    }
    steps.push({
      type: "markSorted",
      index:i
    })
  }

  steps.push({
    type: "markSorted",
    index: n - 1
  })

  return steps
}

export default selectionSort;
