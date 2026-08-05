import Bars from '../components/Bars';
import Controls from '../components/Controls';

function SortingPage() {
  const testArray = [5, 7, 8, 9, 1, 2, 4]
  return (
    <div className='p-8'>
      <Controls />
      <Bars data={testArray} />
    </div>
  )
}

export default SortingPage
