function getNeighbours(current, grid) {
  const nArray = []
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]

  for (const [rowChange, colChange] of directions) {
    const newRow = current.row + rowChange
    const newCol = current.col + colChange

    if (
      newRow < 0 ||
      newRow >= grid.length ||
      newCol < 0 ||
      newCol >= grid[0].length
    ) {
      continue
    }

    if (grid[newRow][newCol].type === "wall") {
      continue
    }

    nArray.push(grid[newRow][newCol])
  }

  return nArray
}

function reconstructPath(parent, endCell, startCell) {
  const path = []
  let current = endCell
  const endKey = `${endCell.row}-${endCell.col}`

  const endIsStart =
    endCell.row === startCell.row && endCell.col === startCell.col

  if (!parent.has(endKey) && !endIsStart) {
    return []
  }

  while (current) {
    path.unshift(current)
    const key = `${current.row}-${current.col}`
    const isStart =
      current.row === startCell.row && current.col === startCell.col
    if (isStart) break
    current = parent.get(key)
  }

  return path
}

function dijkstra(grid, startCell, endCell) {
  const steps = []
  const parent = new Map()
  const cost = new Map()
  const visited = new Set()
  const queue = [{ cell: startCell, cost: 0 }]

  const startKey = `${startCell.row}-${startCell.col}`
  cost.set(startKey, 0)

  while (queue.length > 0) {
    let minIndex = 0
    for (let i = 1; i < queue.length; i++) {
      if (queue[i].cost < queue[minIndex].cost) minIndex = i
    }

    const { cell: current, cost: currentCost } = queue.splice(minIndex, 1)[0]
    const currentKey = `${current.row}-${current.col}`

    if (visited.has(currentKey)) continue
    visited.add(currentKey)

    steps.push({ type: "visit", row: current.row, col: current.col })

    if (current.row === endCell.row && current.col === endCell.col) {
      break
    }

    const neighbours = getNeighbours(current, grid)
    for (const neighbour of neighbours) {
      const neighbourKey = `${neighbour.row}-${neighbour.col}`
      const weight = neighbour.weight ?? 1
      const newCost = currentCost + weight

      if (!cost.has(neighbourKey) || newCost < cost.get(neighbourKey)) {
        cost.set(neighbourKey, newCost)
        parent.set(neighbourKey, current)
        queue.push({ cell: neighbour, cost: newCost })
      }
    }
  }

  const path = reconstructPath(parent, endCell, startCell)
  for (const cell of path) {
    steps.push({ type: "path", row: cell.row, col: cell.col })
  }

  return steps
}

export default dijkstra
