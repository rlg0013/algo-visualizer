function getPathCells(steps, currentStep) {
  const path = []
  for (let i = 0; i <= currentStep; i++) {
    if (steps[i]?.type === "path") {
      path.push({ row: steps[i].row, col: steps[i].col })
    }
  }
  return path
}

export default getPathCells
