import React, { useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import MyButton from '../UI/MyButton'
import AgeRangeSelector from '../UI/AgeRangeSelector'


interface AgeRangeModalProps {
  defaultLeftValue: number,
  defaultRightValue: number,
  onSaveAgeRange: (selectedLeftValue: number, selectedRightValue: number) => void,
  onClose: () => void
}

const AgeRangeModal = ({ defaultLeftValue, defaultRightValue, onSaveAgeRange, onClose }: AgeRangeModalProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()

  const [leftValue, setLeftValue] = useState(defaultLeftValue);
  const [rightValue, setRightValue] = useState(defaultRightValue);

  return (
    <div className={`fixed top-0 left-0 nMb:left-1/2 nMb:-translate-x-1/2 nMb:max-w-[425px] w-full min-h-screen z-20 py-14 
      ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'}`}
    >
      <div className={`fixed top-0 left-0 nMb:left-1/2 nMb:-translate-x-1/2 nMb:max-w-[425px] w-full gap-x-6 py-3 px-3 flex items-center justify-between`}>
        <CloseIcon
          className={`h-6 w-6 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
          onClick={onClose}
        />
        <div className='flex-1 text-lg'>{t('ageRange')}</div>
        <div>
          <MyButton
            color='yellow'
            onClick={() => onSaveAgeRange(leftValue, rightValue)}
            title='save'
          />
        </div>
      </div>

      <div className='py-3'>
        <AgeRangeSelector
          leftValue={leftValue}
          rightValue={rightValue}
          setLeftValue={setLeftValue}
          setRightValue={setRightValue}
        />
      </div>
    </div>
  )
}

export default AgeRangeModal