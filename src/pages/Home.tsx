import React, { useEffect, useState } from 'react'
import Navbar from '../UI/Navbar'
import { ReactComponent as LogoIcon } from '../assets/logo.svg'
import { ReactComponent as PlaneIcon } from '../assets/plane.svg'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import { ILetter } from '../types/Auth/auth'
import Letter from '../components/Letter'
import { readLetter } from '../utils/readLetter'
import { useActions } from '../hooks/useActions'
import Map from '../UI/Map'
import Loader from '../UI/Loader'
import { filterRecenntlyAndOnWayLetters } from '../utils/filterRecentlyAndOnWayLetters'
import OpenedLetter from '../components/OpenedLetter'

const Home = () => {
  const { t } = useTranslation()
  const { theme } = useTypedSelector(state => state.theme)
  const { user, chatList, friends } = useTypedSelector(state => state.auth)
  const { fetchUserChatList } = useActions()

  const [recentlyLetters, setRecentlyLetters] = useState<ILetter[]>([])
  const [lettersOnWay, setLettersOnWay] = useState<ILetter[]>([])
  const [openedLetter, setOpenedLetter] = useState<ILetter | null>(null)
  const [isMapVisible, setIsMapVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      const [resRecentlyLetters, resLettersOnWay] = filterRecenntlyAndOnWayLetters(chatList, user)
      setRecentlyLetters(resRecentlyLetters)
      setLettersOnWay(resLettersOnWay)
    }
  }, [chatList, user])

  const handleMapVisible = () => {
    setIsMapVisible(prev => !prev)
  }

  const onCloseLetter = () => {
    setOpenedLetter(null)
  }

  const fetchChatList = () => {
    if (user) {
      fetchUserChatList(user.id, setLoading)
    }
  }

  const onOpenLetter = async (letter: ILetter) => {
    if (!letter.isRead && user) {
      await readLetter(letter.id)
      fetchChatList()
    }
    setOpenedLetter(letter)
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'} min-h-full max-h-none w-full pt-4`}>
      <div className='mb-2 px-2'>
        <LogoIcon className={`${theme === 'dark' ? 'fill-white' : 'fill-black'} h-20 w-20`} />
      </div>
      <div className='mb-4'>
        <div className='px-2'>
          <div className='relative inline-block mb-4'>
            <div className='px-2 mb-1 text-lg font-medium'>{t('recentlyReceived')}</div>
            <div className='bg-yellow-400 absolute top-full left-0 w-full h-1' />
          </div>
        </div>
        <div className='flex gap-x-4 flex-nowrap overflow-x-auto px-20 withoutscroll'>
          {!!friends.length && !!recentlyLetters.length && recentlyLetters.map((letter, index) => (
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

      {!!friends.length && openedLetter && (
        <OpenedLetter
          friend={friends.find(f => f.id === openedLetter.senderId) || friends[0]}
          isNextLetterArrowDisabled={true}
          isPrevLetterArrowDisabled={true}
          letter={openedLetter}
          letterIndex={0}
          onClose={onCloseLetter}
          showSwitchLettersArrows={false}
          openAnotherLetter={() => { }}
        />
      )}

      {loading
        ? (
          <div className='px-2 flex items-center gap-x-1'>
            <Loader size='7' />
            <div>{t('loading')}</div>
          </div>
        )
        : <div className='px-2 flex items-center gap-x-2'>
          <PlaneIcon className={`fill-yellow-400 h-7 w-7 -mb-[2px]`} />
          {lettersOnWay.length
            ? (
              <div
                className='w-full flex items-center justify-between'
                onClick={handleMapVisible}
              >
                <div className='text-sm'>{t('lettersOnWay')}</div>
                <div
                  className='bg-yellow-400 h-7 w-7 rounded-full flex items-center justify-center text-black font-semibold'
                >
                  {lettersOnWay.length}
                </div>
              </div>
            )
            : <div onClick={fetchChatList} className='text-sm'>{t('noLettersOnWay')}</div>
          }
        </div>
      }

      <div id='map'></div>
      {isMapVisible && user && !!friends.length && (
        <Map
          onWayLetters={lettersOnWay}
          onClose={handleMapVisible}
        />
      )}
      <Navbar />
    </div>
  )
}

export default Home