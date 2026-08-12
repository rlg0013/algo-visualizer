function findCell(grid, type) {
  for (const row of grid) {
    for (const cell of row) {
      if (cell.type === type) return cell
    }
  }
  return null
}

export default findCell
