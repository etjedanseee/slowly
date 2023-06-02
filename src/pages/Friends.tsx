import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useActions } from '../hooks/useActions'
import { ReactComponent as FriendsIcon } from '../assets/addFriend.svg'
import { fetchUsersById } from '../utils/fetchUserById'
import { IUser } from '../types/Auth/auth'

const Friends = () => {
  const { t } = useTranslation()
  const { theme } = useTypedSelector(state => state.theme)
  const { user, chatList } = useTypedSelector(state => state.auth)
  const { fetchUserChatList } = useActions()

  const [users, setUsers] = useState<IUser[]>([])

  const msInDay = 86400000

  useEffect(() => {
    if (user && !chatList.length) {
      fetchUserChatList(user.id)
    }
  }, [user, chatList.length])

  useEffect(() => {
    if (!!chatList.length) {
      const ids = chatList.map(chat => chat.chatId)
      fetchUsersById(ids, setUsers)
    }
  }, [chatList])

  return (
    <div className='flex flex-col h-screen'>
      <div className={`${theme === 'dark' ? 'text-gray-200 bg-zinc-900' : 'text-gray-900 bg-gray-200'} font-medium text-2xl px-4 py-3`}>
        {t('penpals')}
      </div>
      <div className={`px-2 py-2 flex-1 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}`}>
        <div className='flex justify-end'>
          <div className={`flex items-center gap-x-2 px-3 py-1 rounded-lg ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
            <FriendsIcon className={`h-4 w-4 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`} />
            <div className='text-sm font-medium'>{chatList.length}</div>
          </div>
        </div>

        <div className='flex flex-col gap-y-4'>
          {chatList.map(chat => (
            <div
              key={chat.chatId}
              className='flex items-center gap-x-3'
            >
              <img src={users.find(u => u.id === chat.chatId)?.info.avatarUrl} className='rounded-full h-12 w-12' alt="user avatar" />
              <div className='flex-1'>
                <div className='mb-1 font-medium leading-none'>{users.find(u => u.id === chat.chatId)?.info.nickName}</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {users.find(u => u.id === chat.chatId)?.geo.location.country}
                </div>
              </div>

              <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {(Date.now() - +new Date(chat.messages[0].deliveredDate) <= msInDay) && (
                  new Date(chat.messages[0].deliveredDate).getDate() === new Date().getDate()
                )
                  ? new Date(chat.messages[0].deliveredDate).toLocaleTimeString().slice(0, -3)
                  : new Date(chat.messages[0].deliveredDate).toDateString()
                }
              </div>
            </div>
          ))}
        </div>
      </div>
      <Navbar />
    </div>
  )
}

export default Friends