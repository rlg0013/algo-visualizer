import Bars from '../components/Bars';
import Controls from '../components/Controls';
import useAnimationPlayer from '../hooks/useAnimationPlayer';
import { useState } from 'react';

function generateRandomArray(size) {
  return Array.from({length: size}, ()=> Math.floor(Math.random()*100) + 5)
}

function SortingPage() {
  const [size, setSize] = useState(20)
  const [array, setArray] = useState(() => generateRandomArray(size))
  const dummySteps = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const { currentStep, isPlaying ,play, pause, reset } = useAnimationPlayer(dummySteps)

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
        onSizeChange={handleSizeChange}
        onPlay={play}
        onPause={pause}
        onReset={reset} />
      <Bars data={array} />
      <p>Current Step :{currentStep} {isPlaying ? 'Playing' : 'Paused'}</p>
    </div>
  )
}

export default SortingPage
