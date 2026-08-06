import { useState, useEffect } from 'react'

function useAnimationPlayer(steps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(300)

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, speed)
    return () => clearInterval(interval)
  }, [isPlaying, speed, steps.length])

  function play() { setIsPlaying(true) }
  function pause() { setIsPlaying(false) }
  function reset() { setCurrentStep(0), setIsPlaying(false) }

  return {currentStep, isPlaying, speed, setSpeed, play, pause, reset}
}

export default useAnimationPlayer;
