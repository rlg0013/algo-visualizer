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
    return [] // end was never reached
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

function bfs(grid, startCell, endCell) {
  const steps = []
  const visited = new Set()
  const parent = new Map()
  const queue = [startCell]
  visited.add(`${startCell.row}-${startCell.col}`)

  while (queue.length > 0) {
    const current = queue.shift()
    steps.push({ type: "visit", row: current.row, col: current.col })

    if (current.row === endCell.row && current.col === endCell.col) {
      break
    }

    const neighbours = getNeighbours(current, grid)
    for (const neighbour of neighbours) {
      const key = `${neighbour.row}-${neighbour.col}`
      if (!visited.has(key)) {
        visited.add(key)
        parent.set(key, current)
        queue.push(neighbour)
      }
    }
  }

  const path = reconstructPath(parent, endCell, startCell)
  for (const cell of path) {
    steps.push({ type: "path", row: cell.row, col: cell.col })
  }

  return steps
}

export default bfs
