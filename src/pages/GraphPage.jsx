import { useMemo, useState } from 'react'
import Grid from '../components/Grid'
import GraphControls from '../components/GraphControls'
import findCell from '../utils/findCell'
import getVisitedCells from '../utils/getVisitedCells'
import getPathCells from '../utils/getPathCells'
import bfs from "../algorithms/graphs/bfs"
import dfs from "../algorithms/graphs/dfs"
import dijkstra from "../algorithms/graphs/dijkstra"
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
  const [algo, setAlgo] = useState("bfs")
  const [placementMode, setPlacementMode] = useState("wall")

  const startCell = findCell(grid, "start")
  const endCell = findCell(grid, "end")
  const steps = useMemo(
    () => getGraphSteps(algo, grid, startCell, endCell),
    [algo, grid, startCell, endCell]
  )

  const { currentStep, isPlaying, play, pause, reset, speed, setSpeed } = useAnimationPlayer(steps)

  const visitedCells = getVisitedCells(steps, currentStep)
  const pathCells = getPathCells(steps, currentStep)

  function getGraphSteps(algo, grid, startCell, endCell) {
    if (algo === "bfs") return bfs(grid, startCell, endCell)
    if (algo === "dfs") return dfs(grid, startCell, endCell)
    if (algo === "dijkstra") return dijkstra(grid, startCell, endCell)
    return bfs(grid, startCell, endCell)
  }

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
    reset()

    setGrid(prevGrid => {
      const clickedCell = prevGrid[row][col]

      if (placementMode === "start") {
        if (clickedCell.type === "end") return prevGrid

        return prevGrid.map(gridRow =>
          gridRow.map(cell => {
            if (cell.type === "start") return { ...cell, type: "empty" }
            if (cell.row === row && cell.col === col) return { ...cell, type: "start", weight: undefined }
            return cell
          })
        )
      }

      if (placementMode === "end") {
        if (clickedCell.type === "start") return prevGrid

        return prevGrid.map(gridRow =>
          gridRow.map(cell => {
            if (cell.type === "end") return { ...cell, type: "empty" }
            if (cell.row === row && cell.col === col) return { ...cell, type: "end", weight: undefined }
            return cell
          })
        )
      }

      if (placementMode === "weight") {
        if (clickedCell.type === "start" || clickedCell.type === "end") {
          return prevGrid
        }

        const nextWeight = (clickedCell.weight ?? 1) >= 5
          ? 1
          : (clickedCell.weight ?? 1) + 1

        return prevGrid.map(gridRow =>
          gridRow.map(cell => {
            if (cell.row !== row || cell.col !== col) return cell

            return {
              ...cell,
              type: "empty",
              weight: nextWeight === 1 ? undefined : nextWeight,
            }
          })
        )
      }

      if (clickedCell.type === "start" || clickedCell.type === "end") {
        return prevGrid
      }

      const newGrid = [...prevGrid]
      const newRow = [...newGrid[row]]

      newRow[col] = {
        ...newRow[col],
        type: newRow[col].type === "wall" ? "empty" : "wall",
        weight: undefined,
      }

      newGrid[row] = newRow

      return newGrid
    })
  }

  function handleClearWalls() {
    reset()
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
    reset()
    setGrid(createInitialGrid(15, 30))
  }

  function handleAlgoChange(newAlgo) {
    setAlgo(newAlgo)
    reset()
  }

  return (
    <div className="p-8">
      <div className="mb-4">
        <GraphControls
          algo={algo}
          placementMode={placementMode}
          speed={speed}
          onAlgoChange={handleAlgoChange}
          onPlacementModeChange={setPlacementMode}
          onSpeedChange={setSpeed}
          onPlay={play}
          onPause={pause}
          onReset={reset}
          onClearWalls={handleClearWalls}
          onClearGrid={handleClearGrid}
        />
      </div>

      <div className="overflow-x-auto pb-2">
        <Grid grid={displayGrid} onCellUpdate={handleCellUpdate} />
      </div>

      <p className="mt-4 text-sm text-slate-500">
        Current Step: <span className="font-medium text-slate-700">{currentStep}</span>
        <span className="mx-2 text-slate-300">|</span>
        {isPlaying ? 'Playing' : 'Paused'}
      </p>
    </div>
  )
}

export default GraphPage
