import { useRef } from 'react'

function Grid({ grid, onCellUpdate }) {
  const isDragging = useRef(false)

  function handleMouseDown(row, col) {
    isDragging.current = true
    onCellUpdate(row, col)
  }

  function handleMouseEnter(row, col) {
    if (isDragging.current) {
      onCellUpdate(row, col)
    }
  }

  function handleMouseUp() {
    isDragging.current = false
  }

  return (
    <div onMouseUp={handleMouseUp}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex w-max">
          {row.map((cell, colIndex) => {
            let colorClass = "bg-white"
            if (cell.type === "wall") colorClass = "bg-gray-800"
            else if (cell.displayType === "start") colorClass = "bg-green-500"
            else if (cell.displayType === "end") colorClass = "bg-red-500"
            else if (cell.displayType === "visited") colorClass = "bg-purple-500"
            else if (cell.displayType === "path") colorClass = "bg-yellow-500"
            else if (cell.weight > 1) colorClass = "bg-blue-100"

            return (
              <div
                key={colIndex}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                className={`flex h-6 w-6 shrink-0 select-none items-center justify-center border border-gray-300 text-xs font-semibold text-slate-800 ${colorClass}`}
              >
                {cell.weight > 1 && <span>{cell.weight}</span>}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Grid
