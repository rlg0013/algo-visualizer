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

  function handleClearWalls() {
    setGrid(prevGrid => (
      prevGrid.map(row => (
        row.map(cell => (
          cell.type === "wall"
            ? { ...cell, type: "empty" }
            : cell
        ))
      ))
    ))
  }

  function handleClearGrid() {
    setGrid(createInitialGrid(15, 30))
  }

  return (
    <div>
      <Grid
        grid={grid}
        onCellUpdate={handleCellUpdate}
      />

      <button
        onClick={handleClearWalls}
        className="bg-orange-600 text-white px-4 py-2 rounded"
      >
        Clear Walls
      </button>

      <button
        onClick={handleClearGrid}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Clear Grid
      </button>
    </div>
  )
}

export default GraphPage
