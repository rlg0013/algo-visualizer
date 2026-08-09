
function Controls({ size, onSizeChange, onNewArray, onPlay, onPause, onReset, speed, onSpeedChange, onAlgoChange, algo}) {

  return (
    <div className="flex gap-4 p-4 items-center">
      <input
        type="range"
        min="50"
        max="1000"
        value={size}
        onChange={(e) => onSizeChange(Number(e.target.value))}
      />

      <input
        type="range"
        min="50"
        max="1000"
        value={speed}
        onChange={(e) => onSpeedChange(Number(e.target.value))}
      />

      <select
        value={algo}
        onChange={(e) => onAlgoChange(e.target.value)}
      >
        <option value="bubble">Bubble Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="quick">Quick Sort</option>

      </select>

      <button
        onClick = {onNewArray}
        className="bg-blue-600 text-white px-4 py-2 rounded">
        New Array
      </button>

      <button
        onClick = {onPlay}
        className="bg-purple-600 text-white px-4 py-2 rounded">
        Play
      </button>

      <button
        onClick = {onPause}
        className="bg-teal-600 text-white px-4 py-2 rounded">
        Pause
      </button>

      <button
        onClick = {onReset}
        className="bg-pink-600 text-white px-4 py-2 rounded">
        Reset
      </button>

    </div>
  );
}

export default Controls;
