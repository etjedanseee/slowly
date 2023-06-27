import React, { useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector';

const AgeRangeSelector = () => {
  const { theme } = useTypedSelector(state => state.theme)
  const ageOptionsLeft = [0, 20, 25, 30, 35, 40, 45, 50, 55, 60];
  const ageOptionsRight = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65];

  const [isLeftOptionsVisible, setIsLeftOptionsVisible] = useState(false)
  const [isRightOptionsVisible, setIsRightOptionsVisible] = useState(false)

  const [leftValue, setLeftValue] = useState(ageOptionsLeft[0]);
  const [rightValue, setRightValue] = useState(ageOptionsRight[0]);

  const handleLeftOptionsVisible = () => {
    setIsLeftOptionsVisible(prev => !prev)
  }

  const handleRightOptionsVisible = () => {
    setIsRightOptionsVisible(prev => !prev)
  }

  const handleLeftValueChange = (value: number) => {
    handleLeftOptionsVisible()
    setLeftValue(value);
    if (value >= rightValue) {
      setRightValue(value + 5);
    }
  };

  const handleRightValueChange = (value: number) => {
    handleRightOptionsVisible()
    setRightValue(value);
    if (value <= leftValue) {
      if (value - 5 !== 15) {
        setLeftValue(value - 5);
      } else {
        setLeftValue(0)
      }
    }
  };

  return (
    <div className={`flex items-start justify-center gap-x-16 text-black relative font-medium 
      ${theme === 'dark' ? 'text-white' : 'text-black'}`}
    >
      {!isLeftOptionsVisible
        ? (
          <div
            className={`border-y-[1px] ${theme === 'dark' ? 'border-white' : 'border-gray-500'} py-2 px-8 text-xl`}
            onClick={handleLeftOptionsVisible}
          >{leftValue}</div>
        )
        : (
          <div className={`flex flex-col text-center gap-y-1 rounded-xl ${theme === 'dark' ? 'border-white' : 'border-gray-500'} border-2 text-lg py-1`}>
            {ageOptionsLeft.map((value) => (
              <div
                key={value}
                onClick={() => handleLeftValueChange(value)}
                className={`${value === leftValue && 'text-yellow-400'} px-8`}
              >
                {value}
              </div>
            ))
            }
          </div>
        )}

      <div className='text-3xl absolute top-5 -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center text-center gap-x-[2px]'>
        {[0, 1, 2].map(i => (
          <div key={i} className={`h-1 w-1 rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-gray-500'}`} />
        ))}
      </div>

      {!isRightOptionsVisible
        ? (
          <div
            className={`border-y-[1px] ${theme === 'dark' ? 'border-white' : 'border-gray-500'} py-2 px-8 text-xl`}
            onClick={handleRightOptionsVisible}
          >{rightValue}</div>
        )
        : (
          <div className={`flex flex-col text-center gap-y-1 rounded-xl ${theme === 'dark' ? 'border-white' : 'border-gray-500'} border-2 text-lg py-1`}>
            {ageOptionsRight.map((value) => (
              <div
                key={value}
                onClick={() => handleRightValueChange(value)}
                className={`${value === rightValue && 'text-yellow-400'} px-8`}
              >
                {value}
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default AgeRangeSelector