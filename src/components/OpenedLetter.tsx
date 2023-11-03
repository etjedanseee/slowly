import React, { useState } from 'react'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/arrowDown.svg'
import { ILetter, IUser } from '../types/Auth/auth'
import { useTypedSelector } from '../hooks/useTypedSelector'
import Letter from './Letter'
import WriteLetterButton from '../UI/WriteLetterButton'
import WriteLetter from './WriteLetter'
import { useDeliveryTime } from '../hooks/useDeliveryTime'
import UserAvatar from './UserAvatar'
import { useNavigate } from 'react-router-dom'

interface OpenedLetterProps {
  letter: ILetter,
  letterIndex: number,
  friend: IUser,
  onClose: () => void,
  showSwitchLettersArrows: boolean,
  isPrevLetterArrowDisabled: boolean,
  isNextLetterArrowDisabled: boolean,
  openAnotherLetter: (num: number) => void
}

const OpenedLetter = ({ letter, friend, onClose, showSwitchLettersArrows, isNextLetterArrowDisabled, isPrevLetterArrowDisabled, openAnotherLetter, letterIndex }: OpenedLetterProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const { user } = useTypedSelector(state => state.auth)
  const navigate = useNavigate()

  const [isWriteLetterVisible, setWriteLetterVisible] = useState(false)

  const { deliveredTime } = useDeliveryTime(user, friend)

  const handleIsWriteLetterVisible = () => {
    setWriteLetterVisible(prev => !prev)
  }

  const onFriendClick = () => {
    navigate('/friends/' + letter.senderId)
  }

  return (
    <div
      className={`absolute top-0 left-0 w-full h-screen z-50 bg-inherit py-1`}
    >
      <div className='py-2 relative mb-4'>
        <div className={`flex ${showSwitchLettersArrows ? 'justify-center' : 'justify-end'}`}>
          <CloseIcon
            className={`absolute top-2 left-2 h-6 w-6 cursor-pointer ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
            onClick={onClose}
          />

          {showSwitchLettersArrows
            ? (
              <div className='text-center text-lg font-medium'>
                {letter.senderId === friend.id ? friend.info.nickName : user?.info.nickName}
              </div>
            )
            : (
              <div
                onClick={onFriendClick}
                className='flex gap-x-2 text-lg font-medium items-center cursor-pointer'
              >
                <div>{friend.info.nickName}</div>
                <UserAvatar
                  userAvatar={friend.info.avatarUrl}
                  canUpdate={false}
                  size={9}
                />
              </div>
            )
          }
        </div>

        {showSwitchLettersArrows && (
          <div className='absolute top-2 right-2 flex items-center'>
            <ArrowDownIcon
              onClick={isPrevLetterArrowDisabled ? () => { } : () => openAnotherLetter(letterIndex - 1)}
              className={`h-7 w-7 rotate-90 
                  ${theme === 'dark'
                  ? isPrevLetterArrowDisabled
                    ? 'fill-gray-500'
                    : 'fill-white cursor-pointer'
                  : isPrevLetterArrowDisabled
                    ? 'fill-zinc-700'
                    : 'fill-black cursor-pointer'
                }
                `}
            />
            <ArrowDownIcon
              onClick={isNextLetterArrowDisabled ? () => { } : () => openAnotherLetter(letterIndex + 1)}
              className={`h-7 w-7 -rotate-90 
                  ${theme === 'dark'
                  ? isNextLetterArrowDisabled
                    ? 'fill-gray-500'
                    : 'fill-white cursor-pointer'
                  : isNextLetterArrowDisabled
                    ? 'fill-zinc-700'
                    : 'fill-black cursor-pointer'
                }
                `}
            />
          </div>
        )}
      </div>

      <div className={`px-3 py-3 flex flex-col justify-end ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}`}>
        <Letter
          letter={letter}
          otherUser={friend}
          index={0}
          onOpenLetter={() => { }}
          isOpened={true}
        />
      </div>

      {!isWriteLetterVisible && <WriteLetterButton onWriteLetterClick={handleIsWriteLetterVisible} />}

      {isWriteLetterVisible && (
        <WriteLetter
          deliveredTime={deliveredTime}
          otherUser={friend}
          onClose={handleIsWriteLetterVisible}
        />
      )}
    </div>
  )
}

export default OpenedLetter