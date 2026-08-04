import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SortingPage from './pages/SortingPage'
import GraphPage from './pages/GraphPage'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SortingPage />} />
        <Route path="/graph" element={<GraphPage />} />
      </Routes>
    </>
  )
}

export default App
