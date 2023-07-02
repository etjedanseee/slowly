import React, { useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ageOptionsLeft, ageOptionsRight } from '../utils/consts';

interface AgeRangeSelectorSelectorProps {
  leftValue: number,
  rightValue: number,
  setLeftValue: (age: number) => void,
  setRightValue: (age: number) => void,
}

const AgeRangeSelector = ({ leftValue, rightValue, setLeftValue, setRightValue }: AgeRangeSelectorSelectorProps) => {
  const { theme } = useTypedSelector(state => state.theme)

  const [isLeftOptionsVisible, setIsLeftOptionsVisible] = useState(false)
  const [isRightOptionsVisible, setIsRightOptionsVisible] = useState(false)

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
    <div className={`flex items-start justify-center gap-x-10 text-black relative font-medium py-10
      ${theme === 'dark' ? 'text-white bg-zinc-900' : 'text-zinc-700 bg-slate-300'}`}
    >
      {!isLeftOptionsVisible
        ? (
          <div
            className={`border-y-[1px] ${theme === 'dark' ? 'border-white' : 'border-gray-500'} py-2 px-8 text-xl`}
            onClick={handleLeftOptionsVisible}
          >{leftValue}</div>
        )
        : (
          <div className={`flex flex-col gap-y-1 rounded-xl ${theme === 'dark' ? 'border-white' : 'border-gray-500'} border-2 text-lg py-1`}>
            {ageOptionsLeft.filter(age => age < rightValue).map((value) => (
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

      <div className='text-3xl flex gap-x-[2px] pt-4'>
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
            {ageOptionsRight.filter(age => age > leftValue).map((value) => (
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