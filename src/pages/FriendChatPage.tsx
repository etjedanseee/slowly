import React, { ChangeEvent, useEffect, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useNavigate, useParams } from 'react-router-dom'
import { IChatList, ILetter, IUser } from '../types/Auth/auth'
import { ReactComponent as ArrowBackIcon } from '../assets/arrowBack.svg'
import { ReactComponent as SearchIcon } from '../assets/navbarIcons/search.svg'
import { ReactComponent as GeoIcon } from '../assets/geo.svg'
import { ageToString } from '../utils/calcAge'
import ZodiacIcon from '../components/ZodiacIcon'
import Letter from '../components/Letter'
import Loader from '../UI/Loader'
import { useTranslation } from 'react-i18next'
import { useDebounce } from '../hooks/useDebounce'
import { readLetter } from '../utils/readLetter'
import { useActions } from '../hooks/useActions'
import OpenedLetter from '../components/OpenedLetter'

const FriendChatPage = () => {
  const { theme } = useTypedSelector(state => state.theme)
  const { user, chatList, friends } = useTypedSelector(state => state.auth)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { id } = useParams()
  const { fetchUserChatList } = useActions()

  const [friend, setFriend] = useState<IUser | null>(null)

  const [currentChat, setCurrentChat] = useState<IChatList | null>(null)
  const [filteredLetters, setFilteredLetters] = useState<ILetter[]>(currentChat?.messages || [])

  const [openedLetter, setOpenedLetter] = useState<ILetter | null>(null)
  const [letterIndex, setLetterIndex] = useState(0)

  const [isPrevLetterArrowDisabled, setPrevLetterArrowDisabled] = useState(true)
  const [isNextLetterArrowDisabled, setNextLetterArrowDisabled] = useState(true)

  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [search, setSearch] = useState('')
  const [isNoResultsFind, setIsNoResultsFind] = useState(false)

  const debounceSearch = useDebounce(search, 700)

  useEffect(() => {
    if (currentChat) {
      if (isSearchVisible) {
        if (!debounceSearch.trim().length) {
          setFilteredLetters([])
        } else {
          const filteredLettersArr = currentChat.messages
            .filter(letter => letter.message.toLowerCase().includes(debounceSearch.toLowerCase()))
          setFilteredLetters(filteredLettersArr)
          if (!filteredLettersArr.length) {
            setIsNoResultsFind(true)
          }
        }
      } else {
        setFilteredLetters(currentChat.messages)
      }
    }
  }, [currentChat, debounceSearch, isSearchVisible])

  useEffect(() => {
    if (!isSearchVisible) {
      setSearch('')
    }
  }, [isSearchVisible])

  useEffect(() => {
    const chat = chatList.find(chat => chat.chatId === id)
    const currentFriend = friends.find(f => f.id === id)
    if (chat) {
      setCurrentChat(chat)
    }
    if (currentFriend) {
      setFriend(currentFriend)
    }
  }, [chatList, id, friends])

  if (!friend || !user) {
    return <div className='flex justify-center py-20'><Loader size='16' /></div>
  }

  const handleSearchVisible = () => {
    setIsSearchVisible(prev => !prev)
  }

  const onGoBackClick = () => {
    navigate(-1)
  }

  const onCloseLetter = () => {
    setOpenedLetter(null)
  }

  const onFriendClick = () => {
    navigate('/users/' + friend?.id)
  }

  const onOpenLetter = async (letterIdx: number) => {
    const letter = filteredLetters[letterIdx]

    if (!letter.isRead && user.id === letter.receiverId && Date.now() > +new Date(letter.deliveredDate)) {
      await readLetter(letter.id)
      fetchUserChatList(user.id, () => { })
    }

    if (!!filteredLetters.length) {
      if (letterIdx === 0) {
        setPrevLetterArrowDisabled(true)
      } else {
        setPrevLetterArrowDisabled(false)
      }
      if (letterIdx === filteredLetters.length - 1) {
        setNextLetterArrowDisabled(true)
      } else {
        setNextLetterArrowDisabled(false)
      }
    }
    if (letter) {
      setLetterIndex(letterIdx)
      setOpenedLetter(letter)
    }
  }

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    if (isNoResultsFind) {
      setIsNoResultsFind(false)
    }
  }

  return (
    <div className={`px-3 py-3 flex-1 flex flex-col ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
      <div className='flex items-center justify-between gap-x-6 mb-4'>
        <ArrowBackIcon
          className={`h-7 w-7 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
          onClick={onGoBackClick}
        />
        {isSearchVisible
          ? <div className='flex-1'>{friend.info.nickName}</div>
          : (
            <SearchIcon
              onClick={handleSearchVisible}
              className={`h-6 w-6 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
            />)
        }
      </div>

      {isSearchVisible
        ? (
          <>
            <div className='flex items-center mb-1'>
              <input
                value={search}
                autoFocus
                placeholder={t('search') || 'search'}
                onChange={onSearchChange}
                className={`${theme === 'dark' ? '' : ''} bg-inherit py-1 outline-none w-full`}
              />
              <div onClick={handleSearchVisible}>{t('close')}</div>
            </div>
            <div className={`${theme === 'dark' ? 'bg-black' : 'bg-gray-400'} h-[1px] w-full mb-3`} />
            {isNoResultsFind && <div className='text-sm'>{t('noResultsFind')}</div>}
          </>
        )
        : (
          <>
            <div
              className='flex items-center justify-between mb-4'
              onClick={onFriendClick}
            >
              <div>
                <div className='font-medium text-lg'>{friend.info.nickName}</div>
                <div className='flex gap-x-4 items-center'>
                  <div className='flex items-center gap-x-1'>
                    <GeoIcon className={`h-4 w-4 fill-yellow-400`} />
                    <div>{friend.geo.location.country}</div>
                  </div>
                  <div className='flex gap-x-2 items-center'>
                    <ZodiacIcon zodiac={friend.info.zodiac} theme={theme} />
                    <div className='text-sm'>{ageToString(friend.info.birthDate)}</div>
                  </div>
                </div>
              </div>

              <img
                src={friend.info.avatarUrl}
                alt="Other user avatar"
                className='w-12 h-12 rounded-full'
              />
            </div>

            <div className='mb-2 leading-tight text-sm'>
              {friend.profile.biography.length > 50 ? friend.profile.biography.slice(0, 50) : friend.profile.biography}
            </div>

            <div className='flex gap-x-1 mb-4'>
              {friend.interests.slice(0, 2).map(intr => (
                <div
                  key={intr}
                  className='border-2 border-yellow-400 py-1 px-3 rounded-full text-sm'
                >
                  {t(intr)}
                </div>
              ))}
              <div className='border-2 border-yellow-400 py-1 px-3 rounded-full text-sm'>
                {friend.interests.length - 2}+
              </div>
            </div>
          </>
        )
      }

      <div className='grid grid-cols-2 gap-x-4 gap-y-4'>
        {!openedLetter && filteredLetters.map((message, index) => (
          <Letter
            letter={message}
            otherUser={friend}
            index={index}
            onOpenLetter={onOpenLetter}
            key={message.id}
            isOpened={false}
          />
        ))}
      </div>

      {openedLetter && (
        <OpenedLetter
          friend={friend}
          isNextLetterArrowDisabled={isNextLetterArrowDisabled}
          isPrevLetterArrowDisabled={isPrevLetterArrowDisabled}
          letter={openedLetter}
          letterIndex={letterIndex}
          onClose={onCloseLetter}
          openAnotherLetter={onOpenLetter}
          showSwitchLettersArrows={true}
        />
      )}
    </div>
  )
}

export default FriendChatPage