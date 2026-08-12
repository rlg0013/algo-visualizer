function getVisitedCells(steps, currentStep) {
  const visited = []
  for (let i = 0; i <= currentStep; i++) {
    if (steps[i]?.type === "visit") {
      visited.push({ row: steps[i].row, col: steps[i].col })
    }
  }
  return visited
}

export default getVisitedCells
