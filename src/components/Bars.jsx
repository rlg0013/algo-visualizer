function Bars({ data }) {
  return (
    <div className="flex items-end gap-1 h-64">
      {data.map((value, index) => (
        <div
          key={index}
          className="bg-blue-500 w-4"
          style={{ height: `${value * 3}px` }}
        ></div>
      ))}
    </div>
  )
}

export default Bars
