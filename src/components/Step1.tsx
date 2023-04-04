import React, { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SexType } from '../types/User/user'
import TextInput from '../UI/TextInput'
import { regexStringDate } from '../utils/consts'

//готово, нужно придумать как передавать в родит страницу валидность и данные после перехода на след шаг
const Step1 = () => {
  const { t } = useTranslation()

  const [sex, setSex] = useState<SexType>('male')
  const [birthDate, setBirthDate] = useState('')
  const [birthDateError, setBirthDateError] = useState(t('enterDate') || 'Enter correct date')
  const [isBirthDateDirty, setIsBirthDateDirty] = useState(false)
  const [nickName, setNickName] = useState('')
  const [nickNameError, setNickNameError] = useState(t('required') || 'Field is required')
  const [isNickNameDirty, setIsNickNameDirty] = useState(false)

  const [isFormValid, setIsFormValid] = useState(false)


  const handleSex = (s: SexType) => {
    setSex(s)
  }

  const onBirthDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!regexStringDate.test(e.target.value)) {
      setBirthDateError(t('enterDate') || 'Enter correct date')
    } else {
      setBirthDateError('')
    }
    setBirthDate(e.target.value)
  }

  const onBirthDateBlur = () => {
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

  const onNickNameBlur = () => {
    setIsNickNameDirty(true)
  }

  useEffect(() => {
    if (!birthDateError && nickName.length) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }, [birthDate, birthDateError, nickName])

  return (
    <div className='bg-zinc-800 text-white px-2 py-3'>
      <div className='mb-3'>{t('sex')}</div>
      <div className='grid grid-cols-3 text-center font-medium mb-4'>
        <div className={`
          ${sex === 'male' ? 'bg-white text-zinc-900 border-white' : 'bg-zinc-800 text-white border-black'} 
          rounded-l-xl border py-1 transition-colors duration-500
        `}
          onClick={() => handleSex('male')}
        >
          {t('male')}
        </div>

        <div className={`
        ${sex === 'female' ? 'bg-white text-zinc-900 border-white' : 'bg-zinc-800 text-white border-black'}
        border-y py-1 transition-colors duration-500
        `}
          onClick={() => handleSex('female')}
        >
          {t('female')}
        </div>

        <div className={`
        ${sex === 'other' ? 'bg-white text-zinc-900 border-white' : 'bg-zinc-800 text-white border-black'} 
        rounded-r-xl border py-1 transition-colors duration-500
        `}
          onClick={() => handleSex('other')}
        >
          {t('other')}
        </div>
      </div>

      <div className='mb-3'>
        <div className='mb-1'>{t('birthday')}</div>
        <TextInput
          placeholder='DD-MM-YYYY'
          onBlur={onBirthDateBlur}
          onInputChange={onBirthDateChange}
          value={birthDate}
        />
        {(isBirthDateDirty && birthDateError) && <div className='text-red-600 text-sm'>{birthDateError}</div>}
      </div>

      <div>
        <div className='mb-1'>{t('nickName')}</div>
        <TextInput
          placeholder=''
          value={nickName}
          onInputChange={onNickNameChange}
          onBlur={onNickNameBlur}
        />
        {(isNickNameDirty && nickNameError) && <div className='text-red-600 text-sm'>{nickNameError}</div>}
      </div>
    </div>
  )
}

export default Step1