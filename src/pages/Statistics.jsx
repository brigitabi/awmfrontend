import React, { useState } from 'react'
import YourStatistics from './YourStatistics';
import GlobalStatistics from './GlobalStatistics';


const Stats = () => {
  const [selectedOption, setSelectedOption] = useState(''); 

  const handleYourStatemetnesClick = () => { 
    setSelectedOption('Your Statements');
  }

  const handleGlobalClick = () => { 
    setSelectedOption('Global');
  }

  
  return (
    <div>
      <p className='text-center text-2xl py-12'>Statistics 📊</p>
      <div className='flex justify-center items-center py-24'>
        <button onClick={handleYourStatemetnesClick} className='cursor-pointer'>👤 Your Overall Statistics </button>
        <span className='mx-2'>|</span>
        <button onClick={handleGlobalClick} className='cursor-pointer'>Global 🌎</button>
      
      </div>

      <div>
        {selectedOption === 'Your Statements' && <p className='text-center '>< YourStatistics/></p>}
        {selectedOption === 'Global' && <p className='text-center text-xl'><GlobalStatistics/> </p>}
      </div>
    </div>
  )
}

export default Stats;