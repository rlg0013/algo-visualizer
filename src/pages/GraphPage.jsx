import { useState } from 'react'
import Grid from '../components/Grid'
import findCell from '../utils/findCell'
import getVisitedCells from '../utils/getVisitedCells'
import getPathCells from '../utils/getPathCells'
import bfs from "../algorithms/graphs/bfs"
import useAnimationPlayer from '../hooks/useAnimationPlayer'

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

  const startCell = findCell(grid, "start")
  const endCell = findCell(grid, "end")
  const steps = bfs(grid, startCell, endCell)

  const { currentStep, isPlaying, play, pause, reset } = useAnimationPlayer(steps)

  const visitedCells = getVisitedCells(steps, currentStep)
  const pathCells = getPathCells(steps, currentStep)

  const displayGrid = grid.map(row =>
      row.map(cell => {
        const isVisited = visitedCells.some(v => v.row === cell.row && v.col === cell.col)
        const isPath = pathCells.some(p => p.row === cell.row && p.col === cell.col)
        if (isPath) return { ...cell, displayType: "path" }
        if (isVisited && cell.type === "empty") return { ...cell, displayType: "visited" }
        return { ...cell, displayType: cell.type }
      })
    )

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
      <div className="p-8">
        <div className="flex gap-4 mb-4">
          <button onClick={play} className="bg-green-600 text-white px-4 py-2 rounded">Play</button>
          <button onClick={pause} className="bg-yellow-600 text-white px-4 py-2 rounded">Pause</button>
          <button onClick={reset} className="bg-red-600 text-white px-4 py-2 rounded">Reset</button>
          <button onClick={handleClearWalls} className="bg-orange-600 text-white px-4 py-2 rounded">Clear Walls</button>
          <button onClick={handleClearGrid} className="bg-gray-600 text-white px-4 py-2 rounded">Clear Grid</button>
        </div>
        <Grid grid={displayGrid} onCellUpdate={handleCellUpdate} />
      </div>
    )
}

export default GraphPage
