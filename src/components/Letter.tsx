import React, { useEffect, useState } from 'react'
import { ILetter, IUser } from '../types/Auth/auth'
import { msInDay } from '../utils/consts'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'

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

  const [deliveredDateInMin, setDeliveredDateInMin] = useState(Math.round((+new Date(letter.deliveredDate) - Date.now()) / 60000))

  useEffect(() => {
    const deliveryDateInterval = setInterval(() => {
      const res = Math.round((+new Date(letter.deliveredDate) - Date.now()) / 60000)
      setDeliveredDateInMin(res)
    }, 60000)

    return () => {
      clearInterval(deliveryDateInterval)
    }
  }, [letter.deliveredDate, deliveredDateInMin])

  useEffect(() => {
    if (isOpened) {
      window.scrollTo({ top: 0 })
    }
  }, [])

  return (
    <div
      className={`${isOpened ? 'py-4 pb-16' : 'px-2 py-2'} flex flex-col justify-end ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}`}
      onClick={() => onOpenLetter(index)}
    >
      {Date.now() < +new Date(letter.deliveredDate)
        ? letter.senderId === otherUser.id
          ? null
          : isOpened
            ? <div className='flex-1 mb-4 min-h-[100px]'>{letter.message}</div>
            : <div className='flex-1 leading-tight text-xs py-4'>{letter.message.slice(0, 50)}</div>
        : isOpened
          ? <div className='flex-1 mb-4 min-h-[100px]'>{letter.message}</div>
          : <div className='flex-1 leading-tight text-xs py-4'>{letter.message.slice(0, 50)}</div>
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

                {Date.now() < +new Date(letter.deliveredDate) ? (
                  <div className={`flex ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    {`${t('deliveredThrought')} ${deliveredDateInMin < 60
                      ? `${deliveredDateInMin} ${t('minutes')}`
                      : `${Math.round(deliveredDateInMin / 60)} ${t('hours')}`}`}
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
              {Date.now() < +new Date(letter.deliveredDate) ? (
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
                      {(Date.now() - +new Date(letter.deliveredDate) <= msInDay) && (
                        new Date(letter.deliveredDate).getDate() === new Date().getDate()
                      )
                        ? new Date(letter.deliveredDate).toLocaleTimeString().slice(0, -3)
                        : new Date(letter.deliveredDate).toDateString()
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