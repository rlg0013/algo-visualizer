function bubbleSort(inputArray) {
  const array = [...inputArray]
  const steps = []
  const n = array.length

  for (let i = 0; i < n-1; i++){
    for (let j = 0; j < n - i - 1; j++){
      steps.push({ type: "compare", indices: [j, j + 1] })

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]]
        steps.push({type:"swap", indices:[j, j+1], array:[...array]})
      }
    }
    steps.push({ type: "markSorted", index: n - i - 1 })
  }
  steps.push({ type: "markSorted", index: 0 })

  return steps
}

export default bubbleSort;
