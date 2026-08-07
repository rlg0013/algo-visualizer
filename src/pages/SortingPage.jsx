import Bars from '../components/Bars';
import Controls from '../components/Controls';
import bubbleSort from '../algorithms/sorting/bubbleSort';
import getArrayAtStep from '../utils/getArrayAtStep';


import useAnimationPlayer from '../hooks/useAnimationPlayer';
import { useState } from 'react';

function generateRandomArray(size) {
  return Array.from({length: size}, ()=> Math.floor(Math.random()*100) + 5)
}

function SortingPage() {
  const [size, setSize] = useState(20)
  const [array, setArray] = useState(() => generateRandomArray(size))

  const steps = bubbleSort(array)
  const { currentStep, isPlaying, play, pause, reset } = useAnimationPlayer(steps)

  const displayArray = getArrayAtStep(steps, currentStep, array)


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
      <Bars data={displayArray} highlightedIndices = {steps[currentStep]?.indices ?? []} />
      <p>Current Step :{currentStep} {isPlaying ? 'Playing' : 'Paused'}</p>
    </div>
  )
}

export default SortingPage
