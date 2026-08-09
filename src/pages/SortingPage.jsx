import Bars from '../components/Bars';
import Controls from '../components/Controls';
import bubbleSort from '../algorithms/sorting/bubbleSort';
import getArrayAtStep from '../utils/getArrayAtStep';
import getSortedIndices from '../utils/getSortedIndices';
import selectionSort from '../algorithms/sorting/selectionSort';
import mergeSort from '../algorithms/sorting/mergeSort';
import quickSort from '../algorithms/sorting/quickSort';


import useAnimationPlayer from '../hooks/useAnimationPlayer';
import { useState } from 'react';

function generateRandomArray(size) {
  return Array.from({length: size}, ()=> Math.floor(Math.random()*100) + 5)
}

function getSteps(algo, array) {
  if (algo == "bubbble") return bubbleSort(array)
  if (algo == "selection") return selectionSort(array)
  if (algo == "merge") return mergeSort(array)
  if (algo == "quick") return quickSort(array)
  return bubbleSort(array)
}


function SortingPage() {
  const [size, setSize] = useState(20)
  const [array, setArray] = useState(() => generateRandomArray(size))
  const [algo, setAlgo] = useState("bubble")

  const steps = getSteps(algo, array)
  const { currentStep, isPlaying, play, pause, reset, speed, setSpeed } = useAnimationPlayer(steps)

  const displayArray = getArrayAtStep(steps, currentStep, array)
  const sortedIndices = getSortedIndices(steps, currentStep)

  function handleSizeChange(newSize) {
    setSize(newSize)
    setArray(generateRandomArray(newSize))
  }

  function handleNewArray() {
    setArray(generateRandomArray(size))
  }

  function handleAlgoChange(newAlgo) {
    setAlgo(newAlgo)
    reset()
  }

  return (
    <div className='p-8'>
      <Controls
        size={size}
        onNewArray={handleNewArray}
        onSizeChange={handleSizeChange}
        onPlay={play}
        onPause={pause}
        onReset={reset}
        speed={speed}
        onSpeedChange={setSpeed}
        onAlgoChange={handleAlgoChange} />
      <Bars data={displayArray}
        highlightedIndices={steps[currentStep]?.indices ?? []}
        sortedIndices={sortedIndices} />
      <p>Current Step :{currentStep} {isPlaying ? 'Playing' : 'Paused'}</p>
    </div>
  )
}

export default SortingPage
