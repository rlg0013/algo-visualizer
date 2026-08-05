import Bars from '../components/Bars';
import Controls from '../components/Controls';
import { useState} from 'react';

function generateRandomArray(size) {
  return Array.from({length: size}, ()=> Math.floor(Math.random()*100) + 5)
}


function SortingPage() {
  const [size, setSize] = useState(20)
  const [array, setArray] = useState(() => generateRandomArray(size))

  function handleSizeChange(newSize) {
    setSize(newSize)
    setArray(generateRandomArray(newSize))
}

  function handleNewArray() {
    setArray(generateRandomArray(size))
  }
  return (
    <div className='p-8'>
      <Controls
        size={size}
        onNewArray={handleNewArray}
        onSizeChange={handleSizeChange} />
      <Bars data={array} />
    </div>
  )
}

export default SortingPage
