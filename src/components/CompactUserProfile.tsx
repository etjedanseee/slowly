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
  profile: IUser
}

const CompactUserProfile = ({ profile }: CompactUserProfileProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const { user } = useTypedSelector(state => state.auth)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const onUserClick = (id: string) => {
    navigate('/users/' + id)
  }

  return (
    <div
      className={`flex flex-col items-center gap-y-1 relative text-sm py-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}`}
      onClick={() => onUserClick(profile.id)}
    >
      <div className='absolute top-2 right-2'><ZodiacIcon theme={theme} zodiac={profile.info.zodiac} /></div>
      <div className='px-2 relative mb-3'>
        <UserAvatar
          userAvatar={profile.info.avatarUrl}
          theme={theme}
          canUpdate={false}
          size={24}
        />
      </div>
      <div className='font-medium'>{profile.info.nickName}</div>
      <div className='mb-1'>{profile.geo.location.country}</div>
      <div className={`${theme === 'dark' ? 'bg-black' : 'bg-gray-500'} h-[1px] w-full mb-1`} />
      <div className='text-xs flex'>
        {checkCommonLanguages(profile.languages, profile.languages).sort((a, b) => b.level - a.level).slice(0, 2).map((l, i) => (
          <div className='' key={l.engName}>{i === 1 && ','} {l.name}</div>
        ))}
      </div>
      <div className='text-xs'>{t('coincided')}: {filterInterests(profile.interests, profile.interests)[0].length}</div>
    </div>
  )
}

export default CompactUserProfile