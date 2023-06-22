import React, { useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ReactComponent as ArrowBackIcon } from '../assets/arrowBack.svg'
import { ReactComponent as MenuIcon } from '../assets/menu.svg'
import CompactUserProfile from '../components/CompactUserProfile'
import { IUser } from '../types/Auth/auth'

const ManuallySearch = () => {
  const { theme } = useTypedSelector(state => state.theme)
  const { user } = useTypedSelector(state => state.auth)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [findedUsers, setFindedUsers] = useState<IUser[]>([])

  const onGoBackClick = () => {
    navigate(-1)
  }

  return (
    <div className={`px-3 py-16 min-h-screen ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
      <div className='fixed top-0 left-0 w-full flex items-center justify-between gap-x-6 py-3 px-3'>
        <ArrowBackIcon
          className={`h-7 w-7 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
          onClick={onGoBackClick}
        />
        <div className='flex-1'>{t('coincidences')}</div>
        <MenuIcon className={`h-7 w-7 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`} />
        <div className={`${theme === 'dark' ? 'bg-black' : 'bg-gray-500'} h-[1px] w-full absolute top-full left-0`} />
      </div>
      {!findedUsers.length && <div className='mb-2'>No match users</div>}
      <div className='grid grid-cols-2 gap-2'>
        {user && <CompactUserProfile profile={user} />}
      </div>
    </div>
  )
}

export default ManuallySearch