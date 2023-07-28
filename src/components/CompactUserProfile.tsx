import React from 'react'
import { IUser } from '../types/Auth/auth'
import { useTypedSelector } from '../hooks/useTypedSelector'
import UserAvatar from './UserAvatar'
import { checkCommonLanguages } from '../utils/checkCommonLanguages'
import { useTranslation } from 'react-i18next'
import { filterInterests } from '../utils/filterInterests'
import ZodiacIcon from './ZodiacIcon'
import { useNavigate } from 'react-router-dom'

interface CompactUserProfileProps {
  userProfile: IUser
}

const CompactUserProfile = ({ userProfile }: CompactUserProfileProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const onUserClick = (id: string) => {
    navigate('/users/' + id)
  }

  return (
    <div
      className={`flex flex-col items-center gap-y-[2px] relative text-sm py-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}`}
      onClick={() => onUserClick(userProfile.id)}
    >
      <div className='absolute top-2 right-2'><ZodiacIcon theme={theme} zodiac={userProfile.info.zodiac} /></div>
      <div className='mb-1'>
        <UserAvatar
          userAvatar={userProfile.info.avatarUrl}
          canUpdate={false}
          size={24}
        />
      </div>
      <div className='font-medium'>{userProfile.info.nickName}</div>
      <div className='mb-1'>{userProfile.geo.location.country}</div>
      <div className={`${theme === 'dark' ? 'bg-black' : 'bg-gray-500'} h-[1px] w-full mb-1`} />
      <div className='text-xs flex'>
        {checkCommonLanguages(userProfile.languages, userProfile.languages).sort((a, b) => b.level - a.level).slice(0, 2).map((l, i) => (
          <div className='' key={l.engName}>{i === 1 && ','} {l.name}</div>
        ))}
      </div>
      <div className='text-xs'>{t('coincided')}: {filterInterests(userProfile.interests, userProfile.interests)[0].length}</div>
    </div>
  )
}

export default CompactUserProfile