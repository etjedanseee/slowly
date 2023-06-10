import React, { useEffect, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { fetchUserById } from '../utils/fetchUserById'
import { useNavigate, useParams } from 'react-router-dom'
import { ILetter, IUser } from '../types/Auth/auth'
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

const FriendChatPage = () => {
  const { theme } = useTypedSelector(state => state.theme)
  const { user, chatList } = useTypedSelector(state => state.auth)
  const navigate = useNavigate()
  const { id } = useParams()

  const [otherUser, setOtherUser] = useState<IUser | null>(null)
  const [isWriteLetterVisible, setWriteLetterVisible] = useState(false)

  const [openedLetter, setOpenedLetter] = useState<ILetter | null>(null)
  const [letterIndex, setLetterIndex] = useState(0)

  const [isPrevLetterArrowDisabled, setPrevLetterArrowDisabled] = useState(true)
  const [isNextLetterArrowDisabled, setNextLetterArrowDisabled] = useState(true)

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
    const letters = chatList.find(chat => chat.chatId === id)?.messages || []
    const letter = letters[letterIdx]

    if (!!letters.length) {
      if (letterIdx === 0) {
        setPrevLetterArrowDisabled(true)
      } else {
        setPrevLetterArrowDisabled(false)
      }
      if (letterIdx === letters.length - 1) {
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
    <div className={`px-3 py-3 min-h-screen ${theme === 'dark' ? 'bg-zinc-900' : 'bg-gray-200'}`}>
      <div className='flex items-center justify-between mb-4'>
        <ArrowBackIcon
          className={`h-8 w-8 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
          onClick={onGoBackClick}
        />
        <SearchIcon className={`h-7 w-7 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`} />
      </div>

      <div
        className='flex items-center justify-between mb-4'
        onClick={onOtherUserClick}
      >
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
        {!openedLetter && chatList && chatList.find(chat => chat.chatId === id)?.messages.map((message, index) => (
          <Letter
            letter={message}
            otherUser={otherUser}
            index={index}
            onOpenLetter={onOpenLetter}
            key={message.createdAt}
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