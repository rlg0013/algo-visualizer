import { useState } from 'react'
import Grid from '../components/Grid'

function createInitialGrid(rows, cols) {
  const grid = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => ({
      type: "empty",
      row: rowIndex,
      col: colIndex,
    }))
  )

  const startRow = Math.floor(rows / 2)

  grid[startRow][2] = {
    ...grid[startRow][2],
    type: "start"
  }

  grid[startRow][cols - 3] = {
    ...grid[startRow][cols - 3],
    type: "end"
  }

  return grid
}

function GraphPage() {
  const [grid, setGrid] = useState(() => createInitialGrid(15, 30))

  function handleCellUpdate(row, col) {
    setGrid(prevGrid => {
      const cell = prevGrid[row][col]
      if (cell.type === "start" || cell.type === "end") {
        return prevGrid
      }

      const newGrid = [...prevGrid]
      const newRow = [...newGrid[row]]

      newRow[col] = {
        ...newRow[col],
        type: newRow[col].type === "wall" ? "empty" : "wall"
      }
      newGrid[row] = newRow
      return newGrid
    })
  }

  return (
    <div>
      <Grid grid={grid} onCellUpdate={handleCellUpdate} />
    </div>
  )
}

export default GraphPage
