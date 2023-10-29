import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { interest } from '../types/Auth/auth'

interface InterestsProps {
  setInterests: (data: interest[]) => void,
  userInterests: interest[],
  setIsInterestsValid: (bool: boolean) => void
}

const Interests = ({ userInterests, setInterests, setIsInterestsValid }: InterestsProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const { interests } = useTypedSelector(state => state.data)
  const { t } = useTranslation()

  const sortedInterests = useMemo(() => [...interests].sort((a, b) => t(a).localeCompare(t(b))), [interests, t])

  const handleSelectInterest = (selectedI: interest) => {
    const isSelectedIntIncludes = userInterests.includes(selectedI)
    if (isSelectedIntIncludes) {
      const filteredI = userInterests.filter(int => int !== selectedI)
      setInterests(filteredI)
    } else {
      setInterests([...userInterests, selectedI])
    }
  }

  useEffect(() => {
    if (userInterests.length >= 3 && userInterests.length <= 30) {
      setIsInterestsValid(true)
    } else {
      setIsInterestsValid(false)
    }
  }, [userInterests, setIsInterestsValid])

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'} px-2 py-20`}>
      <div className='flex items-start'>
        <div className='flex-1 mb-4'>
          <div className='text-3xl mb-2'>{t('selectInterests')}</div>
          <div className='text-sm'>{t('interestsHelp')}</div>
        </div>
        <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'} rounded-lg px-2`}>
          {userInterests.length} / {interests.length}
        </div>
      </div>

      <div className='grid grid-cols-2 gap-x-3 items-start gap-y-2 text-center'>
        {sortedInterests.map(intr => (
          <div
            key={intr}
            className={`
            ${theme === 'dark'
                ? userInterests.includes(intr)
                  ? 'bg-yellow-400 text-zinc-900' : 'bg-zinc-950 text-gray-200'
                : userInterests.includes(intr)
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