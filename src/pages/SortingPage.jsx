import Bars from '../components/Bars';
import Controls from '../components/Controls';
import bubbleSort from '../algorithms/sorting/bubbleSort';
import getArrayAtStep from '../utils/getArrayAtStep';
import getSortedIndices from '../utils/getSortedIndices';
import selectionSort from '../algorithms/sorting/selectionSort';
import mergeSort from '../algorithms/sorting/mergeSort';
import quickSort from '../algorithms/sorting/quickSort';
import insertionSort from '../algorithms/sorting/insertionSort';


import useAnimationPlayer from '../hooks/useAnimationPlayer';
import { useState } from 'react';

const MIN_ARRAY_SIZE = 10
const MAX_ARRAY_SIZE = 120

function generateRandomArray(size) {
  return Array.from({length: size}, ()=> Math.floor(Math.random()*100) + 5)
}

const complexityInfo = {
  bubble: { time: "O(n^2)", space: "O(1)" },
  selection: { time: "O(n^2)", space: "O(1)" },
  insertion: { time: "O(n^2)", space: "O(1)" },
  merge: { time: "O(n log n)", space: "O(n)" },
  quick: { time: "O(n log n) avg, O(n^2) worst", space: "O(log n)" },
}

function getSteps(algo, array) {
  if (algo == "bubbble") return bubbleSort(array)
  if (algo == "selection") return selectionSort(array)
  if (algo == "merge") return mergeSort(array)
  if (algo == "quick") return quickSort(array)
  if (algo == "insertion") return insertionSort(array)
  return bubbleSort(array)
}


function SortingPage() {
  const [size, setSize] = useState(MIN_ARRAY_SIZE)
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
    <div className="min-h-[calc(100vh-56px)] bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <main className="mx-auto flex max-w-6xl flex-col gap-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Algorithm Visualizer</p>
          <h1 className="mt-1 text-3xl font-semibold text-slate-950">Sorting Playground</h1>
        </div>

        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <Controls
            size={size}
            onNewArray={handleNewArray}
            onSizeChange={handleSizeChange}
            onPlay={play}
            onPause={pause}
            onReset={reset}
            speed={speed}
            onSpeedChange={setSpeed}
            onAlgoChange={handleAlgoChange}
            minSize={MIN_ARRAY_SIZE}
            maxSize={MAX_ARRAY_SIZE}
            algo={algo} />
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-600">
              Time: <span className="font-medium text-slate-900">{complexityInfo[algo].time}</span>
              <span className="mx-2 text-slate-300">|</span>
              Space: <span className="font-medium text-slate-900">{complexityInfo[algo].space}</span>
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-red-500"></div>
                <span>Comparing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-blue-500"></div>
                <span>Unsorted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-green-500"></div>
                <span>Sorted</span>
              </div>
            </div>
          </div>

          <Bars data={displayArray}
            highlightedIndices={steps[currentStep]?.indices ?? []}
            sortedIndices={sortedIndices} />
        </section>

        <p className="text-sm text-slate-500">
          Current Step: <span className="font-medium text-slate-700">{currentStep}</span>
          <span className="mx-2 text-slate-300">|</span>
          {isPlaying ? 'Playing' : 'Paused'}
        </p>
      </main>
    </div>
  )
}

export default SortingPage
