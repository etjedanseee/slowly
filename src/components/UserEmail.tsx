import React, { useState, ChangeEvent, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import TextInput from '../UI/TextInput'
import { isValidEmail } from '../utils/validate'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface UserEmailProps {
  setUserEmail: (data: string | null) => void,
  userEmail: string | null,
  setIsUserEmailValid: (bool: boolean) => void,
  setUserPassword: (data: string | null) => void,
  userPassword: string | null,
}

const UserEmail = ({ setIsUserEmailValid, setUserEmail, userEmail, setUserPassword, userPassword }: UserEmailProps) => {
  const { t } = useTranslation()
  const { theme } = useTypedSelector(state => state.theme)

  const [emailText, setEmailText] = useState(userEmail || '')
  const [emailTextError, setEmailTextError] = useState('')
  const [isEmailDirty, setIsEmailDirty] = useState(false)

  const [passwordText, setPasswordText] = useState(userPassword || '')
  const [passwordTextError, setPasswordTextError] = useState('')
  const [isPasswordDirty, setIsPasswordDirty] = useState(false)

  const onEmailTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.length) {
      setEmailTextError(t('required') || 'Field is required')
    } else if (isValidEmail(e.target.value)) {
      setEmailTextError('')
    } else {
      setEmailTextError(t('enterCorrectEmail') || 'Enter correct email')
    }
    setEmailText(e.target.value)
  }

  const onPasswordTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.length) {
      setPasswordTextError(t('required') || 'Field is required')
    } else if (e.target.value.length < 6) {
      setPasswordTextError(t('enterCorrectPassword') || 'Password must be longer than 6 characters')
    } else {
      setPasswordTextError('')
    }
    setPasswordText(e.target.value)
  }

  const onEmailFocus = () => {
    setIsEmailDirty(true)
  }

  const onPasswordFocus = () => {
    setIsPasswordDirty(true)
  }

  useEffect(() => {
    if (!emailTextError.length && !passwordTextError) {
      setIsUserEmailValid(true)
      setUserEmail(emailText)
      setUserPassword(passwordText)
    } else {
      setIsUserEmailValid(false)
    }
  }, [emailTextError, emailText, setIsUserEmailValid, setUserEmail, passwordTextError, setUserPassword, passwordText])

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'} 
    py-20 px-2 absolute top-0 w-full h-screen`}>
      <div className='mb-4'>
        <div className='mb-2 text-2xl'>{t('email')}</div>
        <TextInput
          placeholder='Enter email'
          value={emailText}
          onInputChange={onEmailTextChange}
          onFocus={onEmailFocus}
        />
        {(isEmailDirty && emailTextError) && <div className='text-red-600 text-sm'>{emailTextError}</div>}
      </div>

      <div className='mb-4'>
        <div className='mb-2 text-2xl'>{t('password')}</div>
        <TextInput
          placeholder='Enter password'
          value={passwordText}
          onInputChange={onPasswordTextChange}
          onFocus={onPasswordFocus}
        />
        {(isPasswordDirty && passwordTextError) && <div className='text-red-600 text-sm'>{passwordTextError}</div>}
      </div>
    </div>
  )
}

export default UserEmail