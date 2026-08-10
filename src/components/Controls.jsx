
function Controls({ size, onSizeChange, onNewArray, onPlay, onPause, onReset, speed, onSpeedChange, onAlgoChange, algo, minSize, maxSize}) {
  const speedPercent = Math.round(speed / 10)

  return (
    <div className="flex flex-wrap items-end gap-4">
      <label className="flex min-w-44 flex-1 flex-col gap-2 text-sm font-medium text-slate-700">
        <span className="flex items-center justify-between gap-3">
          <span>Array Size</span>
          <span className="text-xs font-semibold text-slate-500">{size}</span>
        </span>
        <input
          className="accent-blue-600"
          type="range"
          min={minSize}
          max={maxSize}
          value={size}
          onChange={(e) => onSizeChange(Number(e.target.value))}
        />
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
          onChange={(e) => onSpeedChange(Number(e.target.value))}
        />
      </label>

      <label className="flex min-w-44 flex-col gap-2 text-sm font-medium text-slate-700">
        Algorithm
        <select
          className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          value={algo}
          onChange={(e) => onAlgoChange(e.target.value)}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>

        </select>
      </label>

      <div className="flex flex-wrap gap-2">
        <button
          onClick = {onNewArray}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300">
          New Array
        </button>

        <button
          onClick = {onPlay}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200">
          Play
        </button>

        <button
          onClick = {onPause}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200">
          Pause
        </button>

        <button
          onClick = {onReset}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200">
          Reset
        </button>
      </div>

    </div>
  );
}

export default Controls;
