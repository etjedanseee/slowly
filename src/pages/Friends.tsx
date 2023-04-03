import React from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import { useTypedSelector } from '../hooks/useTypedSelector'

const Friends = () => {
  const { t } = useTranslation()
  const { theme } = useTypedSelector(state => state.theme)

  return (
    <div className='flex flex-col'>
      <div className={`${theme === 'dark' ? 'text-gray-200 bg-zinc-900' : 'text-gray-900 bg-gray-200'} font-medium text-2xl px-4 py-3`}>
        {t('penpals')}
      </div>
      <div className={`px-4 py-2 h-screen ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}`}>
        <div className={`text-sm font-medium`}>
          {t('friends')}: 0
        </div>
      </div>
      <Navbar />
    </div>
  )
}

export default Friends