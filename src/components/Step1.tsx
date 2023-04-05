import React, { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { IStep1Data } from '../types/Auth/sighUp'
import { SexType } from '../types/User/user'
import TextInput from '../UI/TextInput'
import { isValidDate, dateToString } from '../utils/validateDate'
interface Step1Props {
  setStepData: (data: IStep1Data | null) => void,
  step1Data: IStep1Data | null
}

const Step1 = ({ setStepData, step1Data }: Step1Props) => {
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()

  const [sex, setSex] = useState<SexType>(step1Data?.sex || 'male')
  const [birthDate, setBirthDate] = useState((step1Data?.birthDate && dateToString(step1Data.birthDate)) || '')
  const [birthDateError, setBirthDateError] = useState('')
  const [isBirthDateDirty, setIsBirthDateDirty] = useState(false)
  const [nickName, setNickName] = useState(step1Data?.nickName || '')
  const [nickNameError, setNickNameError] = useState(t('required') || 'Field is required')
  const [isNickNameDirty, setIsNickNameDirty] = useState(false)

  const handleSex = (s: SexType) => {
    setSex(s)
  }

  const onBirthDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isValidDate(e.target.value)) {
      setBirthDateError(t('enterDate') || 'Enter correct date (YYYY-MM-DD)')
    } else {
      setBirthDateError('')
    }
    setBirthDate(e.target.value)
  }

  const onBirthDateFocus = () => {
    setIsBirthDateDirty(true)
  }

  const onNickNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.length) {
      setNickNameError(t('required') || 'Field is required')
    } else {
      setNickNameError('')
    }
    setNickName(e.target.value)
  }

  const onNickNameFocus = () => {
    setIsNickNameDirty(true)
  }

  useEffect(() => {
    if (!birthDateError && nickName.length) {
      setStepData({
        sex,
        nickName,
        birthDate: new Date(Date.parse(birthDate))
      })
    } else {
      setStepData(null)
    }
  }, [birthDate, birthDateError, nickName, sex, setStepData])

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'} px-2 py-3`}>
      <div className='mb-3'>{t('sex')}</div>
      <div className='grid grid-cols-3 text-center font-medium mb-4'>
        <div className={`
          ${sex === 'male'
            ? theme === 'dark'
              ? 'bg-white text-zinc-900 border-white' : 'bg-zinc-800 text-yellow-400 border-zinc-800'
            : theme === 'dark'
              ? 'bg-zinc-800 text-white border-zinc-800' : 'bg-zinc-300 text-zinc-700 border-zinc-300'
          } 
          rounded-l-xl border py-1 transition-colors duration-500
        `}
          onClick={() => handleSex('male')}
        >
          {t('male')}
        </div>

        <div className={`
        ${sex === 'female'
            ? theme === 'dark'
              ? 'bg-white text-zinc-900 border-white' : 'bg-zinc-800 text-yellow-400 border-zinc-800'
            : theme === 'dark'
              ? 'bg-zinc-800 text-white border-zinc-800' : 'bg-zinc-300 text-zinc-700 border-zinc-300'
          } 
        border-y py-1 transition-colors duration-500
        `}
          onClick={() => handleSex('female')}
        >
          {t('female')}
        </div>

        <div className={`
        ${sex === 'other'
            ? theme === 'dark'
              ? 'bg-white text-zinc-900 border-white' : 'bg-zinc-800 text-yellow-400 border-zinc-800'
            : theme === 'dark'
              ? 'bg-zinc-800 text-white border-zinc-800' : 'bg-zinc-300 text-zinc-700 border-zinc-300'
          } 
        rounded-r-xl border py-1 transition-colors duration-500
        `}
          onClick={() => handleSex('other')}
        >
          {t('other')}
        </div>
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

export default Step1