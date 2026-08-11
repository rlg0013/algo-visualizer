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
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => {
            let colorClass = "bg-white"
            if (cell.type === "wall") colorClass = "bg-gray-800"
            else if (cell.type === "start") colorClass = "bg-green-500"
            else if (cell.type === "end") colorClass = "bg-red-500"

            return (
              <div
                key={colIndex}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                className={`w-6 h-6 border border-gray-300 ${colorClass}`}
              ></div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Grid
