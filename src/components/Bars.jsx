function Bars({ data, highlightedIndices = [], sortedIndices = [] }) {
  return (
    <div className="flex h-80 items-end gap-px overflow-hidden rounded-md border border-slate-100 bg-slate-50 px-3 pt-6">
      {data.map((value, index) => {
        const isHighlighted = highlightedIndices.includes(index)
        const isSorted = sortedIndices.includes(index)
        let colorClass = "bg-blue-500"
        if (isSorted) colorClass = "bg-green-500"
        else if (isHighlighted) colorClass = "bg-red-500"
        return (
          <div
            key={index}
            className={`${colorClass} min-w-0.5 flex-1 rounded-t-sm transition-colors duration-150`}
            style={{ height: `${value * 3}px` }}
          ></div>
        )
      })}
    </div>
  )
}

export default Bars
