function GraphControls({
  algo,
  placementMode,
  speed,
  onAlgoChange,
  onPlacementModeChange,
  onSpeedChange,
  onPlay,
  onPause,
  onReset,
  onClearWalls,
  onClearGrid,
}) {
  const speedPercent = Math.round(speed / 10)

  function handleSpeedChange(event) {
    onSpeedChange(Number(event.target.value))
  }

  return (
    <div className="flex flex-wrap items-end gap-4">
      <label className="flex min-w-36 flex-col gap-2 text-sm font-medium text-slate-700">
        Algorithm
        <select
          className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          value={algo}
          onChange={(e) => onAlgoChange(e.target.value)}
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
          onChange={(e) => onPlacementModeChange(e.target.value)}
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

      <div className="flex flex-wrap gap-2">
        <button onClick={onPlay} className="bg-green-600 text-white px-4 py-2 rounded">Play</button>
        <button onClick={onPause} className="bg-yellow-600 text-white px-4 py-2 rounded">Pause</button>
        <button onClick={onReset} className="bg-red-600 text-white px-4 py-2 rounded">Reset</button>
        <button onClick={onClearWalls} className="bg-orange-600 text-white px-4 py-2 rounded">Clear Walls</button>
        <button onClick={onClearGrid} className="bg-gray-600 text-white px-4 py-2 rounded">Clear Grid</button>
      </div>
    </div>
  )
}

export default GraphControls
