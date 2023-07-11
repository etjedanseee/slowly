import React, { ChangeEvent, useEffect, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { fetchUserById } from '../utils/fetchUserById'
import { useNavigate, useParams } from 'react-router-dom'
import { IChatList, ILetter, IUser } from '../types/Auth/auth'
import { ReactComponent as ArrowBackIcon } from '../assets/arrowBack.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/arrowDown.svg'
import { ReactComponent as SearchIcon } from '../assets/navbarIcons/search.svg'
import { ReactComponent as GeoIcon } from '../assets/geo.svg'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import { ageToString } from '../utils/calcAge'
import ZodiacIcon from '../components/ZodiacIcon'
import Letter from '../components/Letter'
import WriteLetterButton from '../UI/WriteLetterButton'
import WriteLetter from '../components/WriteLetter'
import { useDeliveryTime } from '../hooks/useDeliveryTime'
import Loader from '../UI/Loader'
import { useTranslation } from 'react-i18next'
import { useDebounce } from '../hooks/useDebounce'

const FriendChatPage = () => {
  const { theme } = useTypedSelector(state => state.theme)
  const { user, chatList } = useTypedSelector(state => state.auth)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { id } = useParams()

  const [otherUser, setOtherUser] = useState<IUser | null>(null)
  const [isWriteLetterVisible, setWriteLetterVisible] = useState(false)

  const [currentChat, setCurrentChat] = useState<IChatList | null>(null)

  const [openedLetter, setOpenedLetter] = useState<ILetter | null>(null)
  const [letterIndex, setLetterIndex] = useState(0)

  const [isPrevLetterArrowDisabled, setPrevLetterArrowDisabled] = useState(true)
  const [isNextLetterArrowDisabled, setNextLetterArrowDisabled] = useState(true)

  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [search, setSearch] = useState('')
  const debounceSearch = useDebounce(search, 700)

  const [filteredLetters, setFilteredLetters] = useState<ILetter[]>(currentChat?.messages || [])

  const handleSearchVisible = () => {
    setIsSearchVisible(prev => !prev)
  }

  const { deliveredTime } = useDeliveryTime(user, otherUser)

  const onGoBackClick = () => {
    navigate(-1)
  }

  const onCloseLetter = () => {
    setOpenedLetter(null)
  }

  const onOtherUserClick = () => {
    navigate('/users/' + otherUser?.id)
  }

  const handleIsWriteLetterVisible = () => {
    setWriteLetterVisible(prev => !prev)
  }

  const onOpenLetter = (letterIdx: number) => {
    const letter = filteredLetters[letterIdx]

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
  }

  useEffect(() => {
    if (currentChat) {
      if (isSearchVisible) {
        if (!debounceSearch.trim().length) {
          setFilteredLetters([])
        } else {
          const filteredLettersArr = currentChat.messages
            .filter(letter => letter.message.toLowerCase().includes(debounceSearch.toLowerCase()))
          setFilteredLetters(filteredLettersArr)
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
    if (chat) {
      setCurrentChat(chat)
    }
  }, [chatList, id])

  useEffect(() => {
    if (id) {
      fetchUserById(id, setOtherUser, t('noFoundUser'))
    }
  }, [id])

  if (!otherUser) {
    return <div className='flex justify-center py-20'><Loader size='16' /></div>
  }

  return (
    <div className={`px-3 py-3 min-h-screen ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
      <div className='flex items-center justify-between gap-x-6 mb-4'>
        <ArrowBackIcon
          className={`h-7 w-7 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
          onClick={onGoBackClick}
        />
        {isSearchVisible
          ? <div className='flex-1'>{otherUser.info.nickName}</div>
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
          </>
        )
        : (
          <>
            <div
              className='flex items-center justify-between mb-4'
              onClick={onOtherUserClick}
            >
              <div>
                <div className='font-medium text-lg'>{otherUser.info.nickName}</div>
                <div className='flex gap-x-4 items-center'>
                  <div className='flex items-center gap-x-1'>
                    <GeoIcon className={`h-4 w-4 fill-yellow-400`} />
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

            <div className='mb-2 leading-tight text-sm'>
              {otherUser.profile.biography.length > 50 ? otherUser.profile.biography.slice(0, 50) : otherUser.profile.biography}
            </div>

            <div className='flex gap-x-1 mb-4'>
              {otherUser.interests.slice(0, 2).map(intr => (
                <div
                  key={intr}
                  className='border-2 border-yellow-400 py-1 px-3 rounded-full text-sm'
                >
                  {t(intr)}
                </div>
              ))}
              <div className='border-2 border-yellow-400 py-1 px-3 rounded-full text-sm'>
                {otherUser.interests.length - 2}+
              </div>
            </div>
          </>
        )
      }

      <div className='grid grid-cols-2 gap-x-4 gap-y-4'>
        {!openedLetter && filteredLetters.map((message, index) => (
          <Letter
            letter={message}
            otherUser={otherUser}
            index={index}
            onOpenLetter={onOpenLetter}
            key={message.id}
            isOpened={false}
          />
        ))}
      </div>

      {openedLetter !== null && (
        <div
          className={`absolute top-0 left-0 w-full min-h-screen z-10 bg-inherit px-2 py-1`}
        >
          <div className='py-2 relative mb-4'>
            <CloseIcon
              className={`absolute top-2 left-0 h-6 w-6 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
              onClick={onCloseLetter}
            />
            <div className='text-center text-lg font-medium'>
              {openedLetter.senderId === id ? otherUser.info.nickName : user?.info.nickName}
            </div>
            <div className='absolute top-2 right-0 flex items-center'>
              <ArrowDownIcon
                onClick={isPrevLetterArrowDisabled ? () => { } : () => onOpenLetter(letterIndex - 1)}
                className={`h-7 w-7 rotate-90 
                  ${theme === 'dark'
                    ? isPrevLetterArrowDisabled
                      ? 'fill-gray-500'
                      : 'fill-white'
                    : isPrevLetterArrowDisabled
                      ? 'fill-zinc-700'
                      : 'fill-black'
                  }
                `}
              />
              <ArrowDownIcon
                onClick={isNextLetterArrowDisabled ? () => { } : () => onOpenLetter(letterIndex + 1)}
                className={`h-7 w-7 -rotate-90 
                  ${theme === 'dark'
                    ? isNextLetterArrowDisabled
                      ? 'fill-gray-500'
                      : 'fill-white'
                    : isNextLetterArrowDisabled
                      ? 'fill-zinc-700'
                      : 'fill-black'
                  }
                `}
              />
            </div>
          </div>

          <div className={`px-3 py-3 flex flex-col justify-end ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}`}>
            <Letter
              letter={openedLetter}
              otherUser={otherUser}
              index={0}
              onOpenLetter={() => { }}
              isOpened={true}
            />
          </div>

          <WriteLetterButton onWriteLetterClick={handleIsWriteLetterVisible} />

          {isWriteLetterVisible && (
            <WriteLetter
              deliveredTime={deliveredTime}
              otherUser={otherUser}
              onClose={handleIsWriteLetterVisible}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default FriendChatPage