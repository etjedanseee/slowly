import React, { useEffect, useMemo, useState } from 'react'
import { ILetter, IUser } from '../types/Auth/auth'
import { msInDay } from '../utils/consts'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import { ReactComponent as CheckMarkIcon } from '../assets/checkmark.svg'

interface ILetterProps {
  letter: ILetter,
  otherUser: IUser,
  index: number,
  onOpenLetter: (letterInd: number) => void,
  isOpened: boolean
}

const Letter = ({ letter, otherUser, index, onOpenLetter, isOpened }: ILetterProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const { user } = useTypedSelector(state => state.auth)
  const { t } = useTranslation()

  const now = Date.now()
  const deliveredDate = useMemo(() => new Date(letter.deliveredDate), [letter.deliveredDate])
  const [deliveredDateInMin, setDeliveredDateInMin] = useState(Math.round((+deliveredDate - now) / 60000))

  useEffect(() => {
    if (deliveredDateInMin <= 0) {
      return
    }
    const deliveryDateTimeout = setTimeout(() => {
      setDeliveredDateInMin(prev => prev - 1)
    }, 60000)

    return () => {
      clearTimeout(deliveryDateTimeout)
    }
  }, [deliveredDateInMin])

  useEffect(() => {
    if (isOpened) {
      window.scrollTo({ top: 0 })
    }
  }, [isOpened])

  if (!user) {
    return null
  }

  return (
    <div
      className={`${isOpened ? 'py-4 pb-16' : 'px-2 py-2 cursor-pointer'} min-w-[150px] min-h-[100px] flex flex-col justify-end 
        ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}
      `}
      onClick={() => onOpenLetter(index)}
    >
      {!isOpened && (
        <div className='flex-1 flex pb-5'>
          {now > +deliveredDate
            ? letter.isRead
              ? (
                <>
                  <CheckMarkIcon className={`fill-yellow-400 h-3 w-3`} />
                  <CheckMarkIcon className={`fill-yellow-400 h-3 w-3`} />
                </>
              )
              : (
                <>
                  <CheckMarkIcon className={`fill-gray-200 h-3 w-3`} />
                  <CheckMarkIcon className={`fill-yellow-400 h-3 w-3`} />
                </>
              )
            : <CheckMarkIcon className={`fill-gray-200 h-3 w-3`} />
          }
        </div>
      )}
      {now < +deliveredDate
        ? letter.senderId === otherUser.id
          ? null
          : isOpened
            ? <div className='flex-1 mb-8 break-words'>{letter.message}</div>
            : <div className='flex-1 leading-tight text-xs pb-3 break-words'>{letter.message.slice(0, 50)}</div>
        : isOpened
          ? <div className='flex-1 mb-8 break-words'>{letter.message}</div>
          : <div className='flex-1 leading-tight text-xs pb-3 break-words'>{letter.message.slice(0, 50)}</div>
      }
      <div>
        {isOpened
          ? (
            <div className='flex items-center gap-x-3'>
              <img
                src={letter.senderId === otherUser.id ? otherUser.info.avatarUrl : user?.info.avatarUrl}
                className='rounded-full h-16 w-16' alt="user avatar"
              />
              <div className='flex-1'>
                <div className='mb-1 font-medium leading-none'>
                  {letter.senderId === otherUser.id ? otherUser.info.nickName : user?.info.nickName}
                </div>
                <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {letter.senderId === otherUser.id ? otherUser?.geo.location.country : user?.geo.location.country}
                </div>

                {now < +deliveredDate ? (
                  <div className={`flex ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {`${t('deliveredThrought')} ${deliveredDateInMin < 60
                      ? `${deliveredDateInMin} ${t('minutes')}`
                      : `${Math.round(deliveredDateInMin / 60)} ${t('hours')}`}
                    `}
                  </div>
                )
                  : (
                    <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {new Date(letter.deliveredDate).toLocaleString().slice(0, -3)}
                    </div>
                  )
                }
              </div>
            </div>
          )
          : (
            <div>
              {now < +deliveredDate ? (
                <div>
                  <div className='mb-1'>{letter.senderId === otherUser.id ? otherUser.info.nickName : user?.info.nickName}</div>
                  <div className={`flex text-sm leading-tight ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {`${t('deliveredThrought')} ${deliveredDateInMin < 60
                      ? `${deliveredDateInMin} ${t('minutes')}`
                      : `${Math.round(deliveredDateInMin / 60)} ${t('hours')}`}`}
                  </div>
                </div>
              )
                : (
                  <div>
                    <div className='mb-1'>{letter.senderId === otherUser.id ? otherUser.info.nickName : user?.info.nickName}</div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      {(now - +deliveredDate <= msInDay) && (
                        deliveredDate.getDate() === new Date().getDate()
                      )
                        ? deliveredDate.toLocaleTimeString().slice(0, -3)
                        : deliveredDate.toDateString()
                      }
                    </div>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Letter