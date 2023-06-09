import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Navbar from '../UI/Navbar'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ReactComponent as FriendsIcon } from '../assets/addFriend.svg'
import { ReactComponent as ReloadIcon } from '../assets/reload.svg'
import { ReactComponent as AddFriendIcon } from '../assets/addFriend.svg'
import { fetchUsersById } from '../utils/fetchUserById'
import { IUser } from '../types/Auth/auth'
import { msInDay } from '../utils/consts'
import { useNavigate } from 'react-router-dom'
import { useActions } from '../hooks/useActions'
import Loader from '../UI/Loader'
import MyButton from '../UI/MyButton'

const Friends = () => {
  const { t } = useTranslation()
  const { theme } = useTypedSelector(state => state.theme)
  const { user } = useTypedSelector(state => state.auth)
  const { chatList } = useTypedSelector(state => state.auth)
  const navigate = useNavigate()
  const { fetchUserChatList } = useActions()

  const [users, setUsers] = useState<IUser[]>([])
  const [loadingChatList, setLoadingChatList] = useState(false)

  const onFriendClick = (id: string) => {
    navigate('/friends/' + id)
  }

  const onReloadChatListClick = () => {
    if (user && !loadingChatList) {
      fetchUserChatList(user.id, setLoadingChatList)
    }
  }

  const onGotoSearchFriends = () => {
    navigate('/search')
  }

  useEffect(() => {
    if (user && !chatList.length) {
      fetchUserChatList(user.id, setLoadingChatList)
    }
  }, [user, chatList])

  useEffect(() => {
    if (!!chatList.length) {
      const ids = chatList.map(chat => chat.chatId)
      fetchUsersById(ids, setUsers)
    }
  }, [chatList])

  if (!user) {
    return <div className='flex justify-center py-20'><Loader size='16' /></div>
  }

  return (
    <div className='flex flex-col h-screen'>
      <div className={`
        ${theme === 'dark' ? 'text-gray-200 bg-zinc-900' : 'text-gray-900 bg-gray-200'} 
          font-medium text-2xl px-4 py-3 flex items-center justify-between`}
      >
        <div>{t('penpals')}</div>
        <ReloadIcon
          className={`h-6 w-6 ${loadingChatList && 'animate-spin'} ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
          onClick={onReloadChatListClick}
        />
      </div>

      {loadingChatList
        ? <div className='flex justify-center py-10'><Loader size='12' /></div>
        : (
          <div className={`px-2 py-2 flex-1 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}`}>
            <div className='flex justify-end'>
              <div className={`flex items-center gap-x-2 px-3 py-1 rounded-lg ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
                <FriendsIcon className={`h-4 w-4 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`} />
                <div className='text-sm font-medium'>{chatList.length}</div>
              </div>
            </div>

            <div className='flex flex-col gap-y-4'>
              {chatList.length
                ? chatList.map(chat => (
                  <div
                    key={chat.chatId}
                    className='flex items-center gap-x-3'
                    onClick={() => onFriendClick(chat.chatId)}
                  >
                    <img src={users.find(u => u.id === chat.chatId)?.info.avatarUrl} className='rounded-full h-12 w-12' alt="user avatar" />
                    <div className='flex-1'>
                      <div className='mb-1 font-medium leading-none truncate'>{users.find(u => u.id === chat.chatId)?.info.nickName}</div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        {users.find(u => u.id === chat.chatId)?.geo.location.country}
                      </div>
                    </div>

                    <div className={`text-xs flex items-center gap-x-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      <div>
                        {(Date.now() - +new Date(chat.messages[0].deliveredDate) <= msInDay) && (
                          new Date(chat.messages[0].deliveredDate).getDate() === new Date().getDate()
                        )
                          ? new Date(chat.messages[0].deliveredDate).toLocaleTimeString().slice(0, -3)
                          : new Date(chat.messages[0].deliveredDate).toDateString()
                        }
                      </div>
                      {!chat.messages[0].isRead && chat.messages[0].receiverId === user.id && (
                        <div className='bg-yellow-400 h-2 w-2 rounded-full -mt-[1px]' />
                      )}
                    </div>
                  </div>
                ))
                : (
                  <div className='flex flex-col items-center gap-y-4 py-3'>
                    <div className='text-3xl text-center'>{t('findNewPenPals')}</div>
                    <AddFriendIcon
                      className={`h-16 w-16 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
                      onClick={onReloadChatListClick}
                    />
                    <MyButton
                      onClick={onGotoSearchFriends}
                      color='black'
                      title='search'
                      p='py-2'
                    />
                  </div>
                )
              }
            </div>
          </div>
        )
      }
      <Navbar />
    </div>
  )
}

export default Friends