import { useState } from "react";

function Controls({ size, onSizeChange, onNewArray}) {
  const [algo, setAlgo] = useState("bubble");
  const [speed, setSpeed] = useState(100);

  return (
    <div className="flex gap-4 p-4 items-center">
      <input
        type="range"
        min="1"
        max="100"
        value={size}
        onChange={(e) => onSizeChange(Number(e.target.value))}
      />

      <input
        type="range"
        min="1"
        max="100"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
      />

      <select
        value={algo}
        onChange={(e) => setAlgo(e.target.value)}
      >
        <option value="bubble">Bubble Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="insertion">Insertion Sort</option>
      </select>

      <button className="bg-green-600 text-white px-4 py-2 rounded">
        Play
      </button>

      <button className="bg-yellow-600 text-white px-4 py-2 rounded">
        Pause
      </button>

      <button className="bg-red-600 text-white px-4 py-2 rounded">
        Reset
      </button>

      <button
        onClick = {onNewArray}
        className="bg-blue-600 text-white px-4 py-2 rounded">
        New Array
      </button>

    </div>
  );
}

export default Controls;
