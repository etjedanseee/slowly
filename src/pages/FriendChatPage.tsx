import React, { useEffect, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import { fetchUserById } from '../utils/fetchUserById'
import { useNavigate, useParams } from 'react-router-dom'
import { IUser } from '../types/Auth/auth'
import { ReactComponent as ArrowBackIcon } from '../assets/arrowBack.svg'
import { ReactComponent as SearchIcon } from '../assets/navbarIcons/search.svg'
import { ReactComponent as GeoIcon } from '../assets/geo.svg'
import { ageToString } from '../utils/calcAge'
import ZodiacIcon from '../components/ZodiacIcon'
import { msInDay } from '../utils/consts'

const FriendChatPage = () => {
  const { t } = useTranslation()
  const { theme } = useTypedSelector(state => state.theme)
  const { user, chatList } = useTypedSelector(state => state.auth)
  const navigate = useNavigate()

  const { id } = useParams()

  const [otherUser, setOtherUser] = useState<IUser>()

  const onGoBackClick = () => {
    navigate(-1)
  }

  useEffect(() => {
    if (id) {
      //подумать нужно ли отлавливать ошибку
      fetchUserById(id, setOtherUser, () => { })
    }
  }, [id])

  if (!otherUser) {
    return null
  }

  return (
    <div className={`px-3 py-3 ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
      <div className='flex items-center justify-between mb-4'>
        <ArrowBackIcon
          className={`h-8 w-8 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
          onClick={onGoBackClick}
        />
        <SearchIcon className={`h-7 w-7 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`} />
      </div>

      <div className='flex items-center justify-between mb-4'>
        <div>
          <div className='font-medium text-lg'>{otherUser.info.nickName}</div>
          <div className='flex gap-x-4 items-center'>
            <div className='flex items-center gap-x-1'>
              <GeoIcon className={`h-4 w-4 fill-yellow-500`} />
              <div>{otherUser.geo.location.country}</div>
            </div>
            <div className='flex gap-x-2 items-center'>
              <ZodiacIcon zodiac={otherUser.info.zodiac} theme={theme} />
              <div className='text-sm'>{ageToString(otherUser.info.birthDate)}</div>
            </div>
          </div>
        </div>

        <img
          src={otherUser.info.avatarUrl}
          alt="Other user avatar"
          className='w-12 h-12 rounded-full'
        />
      </div>

      <>
        {otherUser.profile.biography.length > 50
          ? <div className='mb-2 leading-tight text-sm'>{otherUser.profile.biography.slice(0, 50)}...</div>
          : <div className='mb-2 leading-tight text-sm'>{otherUser.profile.biography}</div>
        }
      </>

      <div className='flex gap-x-1 mb-4'>
        {otherUser.interests.slice(0, 2).map(intr => (
          <div
            key={intr}
            className='border-2 border-yellow-500 py-1 px-3 rounded-full text-sm'
          >
            {intr}
          </div>

        ))}
        <div className='border-2 border-yellow-500 py-1 px-3 rounded-full text-sm'>
          {otherUser.interests.length - 2}+
        </div>
      </div>

      <div className='grid grid-cols-2 gap-x-4 gap-y-4'>
        {chatList && chatList.find(chat => chat.chatId === id)?.messages.map(message => (
          <div
            key={message.createdAt}
            className={`px-2 py-2 flex flex-col justify-end ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}`}
          >
            {Date.now() < +new Date(message.deliveredDate)
              ? message.senderId === otherUser.id
                ? null
                : <div className='flex-1 leading-tight text-xs py-4'>{message.message.slice(0, 50)}</div>
              : <div className='flex-1 leading-tight text-xs py-4'>{message.message.slice(0, 50)}</div>
            }
            {Date.now() < +new Date(message.deliveredDate) ? (
              <div>
                <div className='mb-1'>{message.senderId === id ? otherUser.info.nickName : user?.info.nickName}</div>
                <div className={`flex text-sm leading-tight ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {`${t('deliveredThrought')} ${(Math.round(+new Date(message.deliveredDate) - Date.now()) / 60000) < 60
                    ? `${Math.round((+new Date(message.deliveredDate) - Date.now()) / 60000)} ${t('minutes')}`
                    : `${Math.round(Math.round((+new Date(message.deliveredDate) - Date.now()) / 60000 / 60))} ${t('hours')}`}`}
                </div>
              </div>
            )
              : (
                <div>
                  <div className='mb-1'>{message.senderId === id ? otherUser.info.nickName : user?.info.nickName}</div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {(Date.now() - +new Date(message.deliveredDate) <= msInDay) && (
                      new Date(message.deliveredDate).getDate() === new Date().getDate()
                    )
                      ? new Date(message.deliveredDate).toLocaleTimeString().slice(0, -3)
                      : new Date(message.deliveredDate).toDateString()
                    }
                  </div>
                </div>
              )
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default FriendChatPage