import React, { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '../hooks/useTypedSelector'
import TextInput from '../UI/TextInput'
import { isValidDate } from '../utils/validate'
import { IUserInfo, SexType } from '../types/Auth/auth'
import { calcZodiac } from '../utils/calcZodiac'
import UserAvatar from './UserAvatar'
import { sexArr } from '../utils/consts'

interface UserInfoProps {
  setUserInfo: (data: IUserInfo | null) => void,
  userInfo: IUserInfo | null,
  setIsUserInfoValid: (b: boolean) => void
}

const UserInfo = ({ setUserInfo, userInfo, setIsUserInfoValid }: UserInfoProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()

  const [isInfoUpdated, setIsInfoUpdated] = useState(false)

  const [avatarUrl, setAvatarUrl] = useState(userInfo?.avatarUrl || '')
  const [sex, setSex] = useState<SexType>(userInfo?.sex || 'male')
  const [birthDate, setBirthDate] = useState(userInfo?.birthDate || '')
  const [birthDateError, setBirthDateError] = useState(t('required') || 'Field is required')
  const [isBirthDateDirty, setIsBirthDateDirty] = useState(false)
  const [nickName, setNickName] = useState(userInfo?.nickName || '')
  const [nickNameError, setNickNameError] = useState(t('required') || 'Field is required')
  const [isNickNameDirty, setIsNickNameDirty] = useState(false)

  const handleSex = (s: SexType) => {
    setSex(s)
    setIsInfoUpdated(true)
  }

  const onBirthDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value
    if (!isValidDate(date)) {
      setBirthDateError(t('enterDate') || 'Enter correct date (YYYY-MM-DD)')
    } else {
      setBirthDateError('')
    }
    setBirthDate(date)
    setIsInfoUpdated(true)
  }

  const onBirthDateFocus = () => {
    setIsBirthDateDirty(true)
  }

  const onNickNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.length) {
      setNickNameError(t('required') || 'Field is required')
    } else if (e.target.value.length >= 15) {
      setNickNameError(t('nickNameMustBeLess15') || 'Nickname must be less than 15 characters')
    } else {
      setNickNameError('')
    }
    setNickName(e.target.value)
    setIsInfoUpdated(true)
  }

  const onNickNameFocus = () => {
    setIsNickNameDirty(true)
  }

  const handleSetAvatarUrl = (url: string) => {
    setAvatarUrl(url)
    setIsInfoUpdated(true)
  }

  useEffect(() => {
    if (isInfoUpdated) {
      if (!birthDateError && !nickNameError && avatarUrl) {
        const updatedUserInfo: IUserInfo = {
          avatarUrl,
          sex,
          nickName,
          birthDate,
          zodiac: calcZodiac(birthDate)
        }
        setUserInfo(updatedUserInfo)
      } else {
        setUserInfo(null)
      }
      setIsInfoUpdated(false)
    }
  }, [birthDate, birthDateError, nickName, sex, setUserInfo, avatarUrl, isInfoUpdated, nickNameError])

  useEffect(() => {
    if (userInfo !== null) {
      setIsUserInfoValid(true)
    } else {
      setIsUserInfoValid(false)
    }
  }, [userInfo, setIsUserInfoValid])

  return (
    <div className={`fixed top-0 left-0 nMb:left-1/2 nMb:-translate-x-1/2 nMb:max-w-[425px] w-full min-h-screen py-20 px-2 z-20 overflow-y-auto
    ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'} `}>
      <UserAvatar
        userAvatar={avatarUrl}
        canUpdate={true}
        updateImage={handleSetAvatarUrl}
      />

      <div className='mb-1'>{t('sex')}</div>
      <div className='grid grid-cols-3 text-center font-medium mb-4 gap-x-1'>
        {sexArr.map(sexT => (
          <div key={sexT} className={`
          ${sex === sexT
              ? theme === 'dark'
                ? 'bg-white text-zinc-900 border-white' : 'bg-yellow-400 text-zinc-800 border-yellow-400'
              : theme === 'dark'
                ? 'bg-zinc-800 text-white border-zinc-800' : 'bg-zinc-300 text-zinc-700 border-zinc-300'
            } 
          rounded-xl border py-1 transition-colors duration-500
        `}
            onClick={() => handleSex(sexT)}
          >
            {t(sexT)}
          </div>
        ))}
      </div>

      <div className='mb-4'>
        <div className='mb-3'>{t('birthday')}</div>
        <TextInput
          placeholder='YYYY-MM-DD'
          onFocus={onBirthDateFocus}
          onInputChange={onBirthDateChange}
          value={birthDate}
        />
        {(isBirthDateDirty && birthDateError) && <div className='text-red-600 text-sm'>{birthDateError}</div>}
      </div>

      <div className='mb-4'>
        <div className='mb-1'>{t('nickName')}</div>
        <TextInput
          placeholder=''
          value={nickName}
          onInputChange={onNickNameChange}
          onFocus={onNickNameFocus}
        />
        {(isNickNameDirty && nickNameError) && <div className='text-red-600 text-sm'>{nickNameError}</div>}
      </div>
    </div>
  )
}

export default UserInfo