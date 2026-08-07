function getArrayAtStep(steps, currentStep, orgiginalArray) {
  for (let i = currentStep; i >= 0; i--){
    if (steps[i].array) {
      return steps[i].array
    }
  }
  return orgiginalArray
}

export default getArrayAtStep
