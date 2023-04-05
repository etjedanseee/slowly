import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { interest } from '../types/User/user'
import { interestArr } from '../utils/consts'

interface Step2Props {
  setStepData: (data: interest[]) => void,
  step2Data: interest[],
  setIsStep2Valid: (bool: boolean) => void
}

const Step2 = ({ step2Data, setStepData, setIsStep2Valid }: Step2Props) => {
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()

  const handleSelectInterest = (selectedI: interest) => {
    const isSelectedIntIncludes = step2Data.find(i => i === selectedI)
    if (isSelectedIntIncludes) {
      const filteredI = step2Data.filter(int => int !== selectedI)
      setStepData([...filteredI])
    } else {
      setStepData([...step2Data, selectedI])
    }
  }

  useEffect(() => {
    if (step2Data.length >= 5 && step2Data.length <= 10) {
      setIsStep2Valid(true)
    } else {
      setIsStep2Valid(false)
    }
  }, [step2Data, setIsStep2Valid])

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'} px-2 py-3`}>
      <div className='flex items-start'>
        <div className='flex-1 mb-4'>
          <div className='text-3xl mb-2'>{t('selectInterests')}</div>
          <div className='text-sm'>{t('interestsHelp')}</div>
        </div>
        <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-300'} rounded-lg px-2`}>
          {step2Data.length} / 10
        </div>
      </div>

      <div className='grid grid-cols-2 gap-x-3 items-start gap-y-2 text-center'>
        {interestArr.map(intr => (
          <div
            key={intr}
            className={`
            ${theme === 'dark'
                ? step2Data.find(i => i === intr)
                  ? 'bg-yellow-400 text-zinc-900' : 'bg-zinc-950 text-gray-200'
                : step2Data.find(i => i === intr)
                  ? 'bg-yellow-400 text-zinc-900 border-2 border-yellow-400' : 'border-2 border-gray-300'
              } 
            rounded-lg px-4 py-2 leading-none`}
            onClick={() => handleSelectInterest(intr)}
          >
            {t(intr)}
          </div>
        ))}
      </div>

    </div>
  )
}

export default Step2