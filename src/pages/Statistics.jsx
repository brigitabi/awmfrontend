import React, { useState } from 'react'


const Stats = () => {
  const [selectedOption, setSelectedOption] = useState(''); 

  const handleYourStatemetnesClick = () => { 
    setSelectedOption('Your Statements');
  }

  const handleOthersClick = () => { 
    setSelectedOption('Others');
  }

  const handleTrendsClick = () => {
    setSelectedOption('Trends'); 
  }
  return (
    <div>
      <p className='text-center text-2xl py-12'>Statistics</p>
      <div className='flex justify-center items-center py-24'>
        <button onClick={handleYourStatemetnesClick} className='cursor-pointer'>Your Statements</button>
        <span className='mx-2'>|</span>
        <button onClick={handleOthersClick} className='cursor-pointer'>Others</button>
        <span className='mx-2'>|</span>
        <button onClick={handleTrendsClick} className='cursor-pointer'>Trends</button>
      </div>

      <div>
        {selectedOption === 'Your Statements' && <p className='text-center -rotate-12'>Test 1</p>}
        {selectedOption === 'Others' && <p className='text-center text-xl rotate-12'>Test 2 </p>}
        {selectedOption === "Trends" && <p className='text-center text-2xl rotate-4 px-4'>Test 3</p>}
      </div>
    </div>
  )
}

export default Stats;