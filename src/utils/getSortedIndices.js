function getSortedIndices(steps, currentStep) {
  const sorted = []

  for (let i = 0; i <= currentStep; i++){
    const step = steps[i]

    if (step?.type === "markSorted") {
      sorted.push(step.index)
    }
  }

  return sorted;
}

export default getSortedIndices;
