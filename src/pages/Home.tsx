import React, { useEffect, useState } from 'react'
import Navbar from '../UI/Navbar'
import { ReactComponent as LogoIcon } from '../assets/logo.svg'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import { ILetter } from '../types/Auth/auth'
import Letter from '../components/Letter'
import WriteLetter from '../components/WriteLetter'
import WriteLetterButton from '../UI/WriteLetterButton'
import { coordsToDistance } from '../utils/calcDistance'

const Home = () => {
  const { t } = useTranslation()
  const { theme } = useTypedSelector(state => state.theme)
  const { user, chatList, friends } = useTypedSelector(state => state.auth)

  const [recentlyLetters, setRecentlyLetters] = useState<ILetter[]>([])
  const [openedLetter, setOpenedLetter] = useState<ILetter | null>(null)
  const [isWriteLetterVisible, setWriteLetterVisible] = useState(false)
  const [friendsDeliveredTime, setFriendsDeliveredTime] = useState<number[]>([])

  useEffect(() => {
    const res: number[] = []
    if (user) {
      friends.forEach(f => {
        const diffGeoDistance = coordsToDistance(user.geo.coord, f.geo.coord)
        res.push(Math.round(diffGeoDistance / 90))
      })
    }
    setFriendsDeliveredTime(res)
  }, [friends, user])

  useEffect(() => {
    const res: ILetter[] = []
    chatList.forEach(chat => {
      const message = chat.messages.find(mess => +new Date(mess.deliveredDate) < Date.now() && mess.receiverId === user?.id)
      if (message) {
        res.push(message)
      }
    })
    setRecentlyLetters(res)
  }, [chatList, user])

  const onCloseLetter = () => {
    setOpenedLetter(null)
  }

  const handleIsWriteLetterVisible = () => {
    setWriteLetterVisible(prev => !prev)
  }

  const onOpenLetter = async (letter: ILetter) => {
    setOpenedLetter(letter)
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'} min-h-screen w-full pt-4`}>
      <div className='mb-2 px-2'>
        <LogoIcon className={`${theme === 'dark' ? 'fill-white' : 'fill-black'} h-20 w-20`} />
      </div>
      <div>
        <div className='px-2 '>
          <div className='relative inline-block mb-4'>
            <div className='px-2 mb-1 text-lg font-medium'>{t('recentlyReceived')}</div>
            <div className='bg-yellow-400 absolute top-full left-0 w-full h-1' />
          </div>
        </div>
        <div className='flex gap-x-4 flex-nowrap overflow-x-auto pl-20'>
          {!!friends.length && recentlyLetters.map((letter, index) => (
            friends.find(f => f.id === letter.senderId)
              ? (
                <Letter
                  letter={letter}
                  otherUser={friends.find(f => f.id === letter.senderId) || friends[0]}
                  index={index}
                  onOpenLetter={() => onOpenLetter(letter)}
                  key={letter.id}
                  isOpened={false}
                />
              )
              : null
          ))}
        </div>
      </div>

      {openedLetter !== null && (
        <div
          className={`absolute top-0 left-0 w-full min-h-screen z-50 bg-inherit px-2 py-1`}
        >
          <div className='py-2 relative mb-4'>
            <CloseIcon
              className={`absolute top-2 left-0 h-6 w-6 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
              onClick={onCloseLetter}
            />
            <div className='text-center text-lg font-medium'>
              {friends.find(f => f.id === openedLetter.senderId)?.info.nickName || friends[0].info.nickName}
            </div>
          </div>

          <div className={`px-3 py-3 flex flex-col justify-end ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}`}>
            <Letter
              letter={openedLetter}
              otherUser={friends.find(f => f.id === openedLetter.senderId) || friends[0]}
              index={0}
              onOpenLetter={() => { }}
              isOpened={true}
            />
          </div>

          <WriteLetterButton onWriteLetterClick={handleIsWriteLetterVisible} />

          {isWriteLetterVisible && (
            <WriteLetter
              deliveredTime={friendsDeliveredTime[friends.findIndex(f => f.id === openedLetter.senderId) || 0]}
              otherUser={friends.find(f => f.id === openedLetter.senderId) || friends[0]}
              onClose={handleIsWriteLetterVisible}
            />
          )}
        </div>
      )}
      <Navbar />
    </div>
  )
}

export default Home