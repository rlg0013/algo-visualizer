import { useMemo, useState } from 'react'
import Grid from '../components/Grid'
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

  function handleSpeedChange(event) {
    setSpeed(Number(event.target.value))
  }

  const speedPercent = Math.round(speed / 10)

  return (
    <div className="p-8">
      <div className="mb-4 flex flex-wrap items-end gap-4">
        <label className="flex min-w-36 flex-col gap-2 text-sm font-medium text-slate-700">
          Algorithm
          <select
            className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            value={algo}
            onChange={(e) => { setAlgo(e.target.value); reset() }}
          >
            <option value="bfs">BFS</option>
            <option value="dfs">DFS</option>
            <option value="dijkstra">Dijkstra</option>
          </select>
        </label>

        <label className="flex min-w-40 flex-col gap-2 text-sm font-medium text-slate-700">
          Placement
          <select
            className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            value={placementMode}
            onChange={(e) => setPlacementMode(e.target.value)}
          >
            <option value="wall">Place Wall</option>
            <option value="start">Place Start</option>
            <option value="end">Place End</option>
            <option value="weight">Place Weight</option>
          </select>
        </label>

        <label className="flex min-w-44 flex-1 flex-col gap-2 text-sm font-medium text-slate-700">
          <span className="flex items-center justify-between gap-3">
            <span>Speed</span>
            <span className="text-xs font-semibold text-slate-500">{speedPercent}%</span>
          </span>
          <input
            className="accent-blue-600"
            type="range"
            min="50"
            max="1000"
            value={speed}
            onInput={handleSpeedChange}
            onChange={handleSpeedChange}
          />
        </label>

        <button onClick={play} className="bg-green-600 text-white px-4 py-2 rounded">Play</button>
        <button onClick={pause} className="bg-yellow-600 text-white px-4 py-2 rounded">Pause</button>
        <button onClick={reset} className="bg-red-600 text-white px-4 py-2 rounded">Reset</button>
        <button onClick={handleClearWalls} className="bg-orange-600 text-white px-4 py-2 rounded">Clear Walls</button>
        <button onClick={handleClearGrid} className="bg-gray-600 text-white px-4 py-2 rounded">Clear Grid</button>
      </div>
      <Grid grid={displayGrid} onCellUpdate={handleCellUpdate} />
      <p className="mt-4 text-sm text-slate-500">
        Current Step: <span className="font-medium text-slate-700">{currentStep}</span>
        <span className="mx-2 text-slate-300">|</span>
        {isPlaying ? 'Playing' : 'Paused'}
      </p>
    </div>
  )
}

export default GraphPage
