function Bars({ data, highlightedIndices = [], sortedIndices = [] }) {
  return (
    <div className="flex items-end gap-1 h-64">
      {data.map((value, index) => {
        const isHighlighted = highlightedIndices.includes(index)
        const isSorted = sortedIndices.includes(index)
        let colorClass = "bg-blue-500"
        if (isSorted) colorClass = "bg-green-500"
        else if (isHighlighted) colorClass = "bg-red-500"
        return (
          <div
            key={index}
            className={`${colorClass} w-4`}
            style={{ height: `${value * 3}px` }}
          ></div>
        )
      })}
    </div>
  )
}

export default Bars
