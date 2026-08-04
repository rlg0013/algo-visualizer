import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <nav className="flex gap-6 p-4 bg-slate-800 text-white">
      <Link to="/">Sorting</Link>
      <Link to="/graph">Graph</Link>
    </nav>
  )
}

export default Navbar
