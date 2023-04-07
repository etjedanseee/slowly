import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { interestArr } from '../utils/consts'
import { interest } from '../types/Auth/auth'

interface InterestsProps {
  setInterests: (data: interest[]) => void,
  interests: interest[],
  setIsInterestsValid: (bool: boolean) => void
}

const Interests = ({ interests, setInterests, setIsInterestsValid }: InterestsProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()

  const handleSelectInterest = (selectedI: interest) => {
    const isSelectedIntIncludes = interests.find(i => i === selectedI)
    if (isSelectedIntIncludes) {
      const filteredI = interests.filter(int => int !== selectedI)
      setInterests([...filteredI])
    } else {
      setInterests([...interests, selectedI])
    }
  }

  useEffect(() => {
    if (interests.length >= 3 && interests.length <= 10) {
      setIsInterestsValid(true)
    } else {
      setIsInterestsValid(false)
    }
  }, [interests, setIsInterestsValid])

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'} px-2 py-20`}>
      <div className='flex items-start'>
        <div className='flex-1 mb-4'>
          <div className='text-3xl mb-2'>{t('selectInterests')}</div>
          <div className='text-sm'>{t('interestsHelp')}</div>
        </div>
        <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-300'} rounded-lg px-2`}>
          {interests.length} / 10
        </div>
      </div>

      <div className='grid grid-cols-2 gap-x-3 items-start gap-y-2 text-center'>
        {interestArr.map(intr => (
          <div
            key={intr}
            className={`
            ${theme === 'dark'
                ? interests.find(i => i === intr)
                  ? 'bg-yellow-400 text-zinc-900' : 'bg-zinc-950 text-gray-200'
                : interests.find(i => i === intr)
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

export default Interests