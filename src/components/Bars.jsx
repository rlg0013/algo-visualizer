function Bars({ data, highlightedIndices = [] }) {
  return (
    <div className="flex items-end gap-1 h-64">
      {data.map((value, index) => {
        const isHighlighted = highlightedIndices.includes(index)
        return (
          <div
            key={index}
            className={isHighlighted ? "bg-red-500 w-4" : "bg-blue-500 w-4"}
            style={{ height: `${value * 3}px` }}
          ></div>
        )
      })}
    </div>
  )
}

export default Bars
