import React, { useState, ChangeEvent, useEffect } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ReactComponent as ArrowBackIcon } from '../assets/arrowBack.svg'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import TextInput from '../UI/TextInput'
import { isValidEmail } from '../utils/validate'
import MyButton from '../UI/MyButton'
import supabase from '../supabaseClient'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const { theme } = useTypedSelector(state => state.theme)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(t('required') || 'Field is required')
  const [isEmailDirty, setIsEmailDirty] = useState(false)
  const [isChangePasswordFormVisible, setIsChangePasswordFormVisible] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(t('required') || 'Field is required')
  const [isPasswordDirty, setIsPasswordDirty] = useState(false)

  const handleChangePasswordFormVisible = () => {
    setIsChangePasswordFormVisible(prev => !prev)
  }

  const onGoBackClick = () => {
    navigate('/auth/signIn')
  }

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value.trim()
    if (!email.length) {
      setEmailError(t('required') || 'Field is required')
    } else if (isValidEmail(email)) {
      setEmailError('')
    } else {
      setEmailError(t('enterCorrectEmail') || 'Enter correct email')
    }
    setEmail(e.target.value)
  }

  const onEmailFocus = () => {
    setIsEmailDirty(true)
  }

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.length) {
      setPasswordError(t('required') || 'Field is required')
    } else if (e.target.value.length < 6) {
      setPasswordError(t('enterCorrectPassword') || 'Password must be longer than 6 characters')
    } else {
      setPasswordError('')
    }
    setPassword(e.target.value)
  }

  const onPasswordFocus = () => {
    setIsPasswordDirty(true)
  }

  const onResetPasswordClick = async () => {
    try {
      const { error } = await supabase.auth
        .resetPasswordForEmail(email, { redirectTo: window.location.origin + '/auth/resetPassword' })
      if (!error) {
        toast.warn(t('checkEmail'))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onSetNewPassword = async () => {
    try {
      const { data, error } = await supabase.auth
        .updateUser({ password: password })
      console.log('new p', data, error)
      if (error) {
        toast.error(t('errorUpdatePassword') + error.message)
        throw new Error(error.message)
      }
      if (data.user) {
        toast.success(t('passwordUpdatedSuccessfully'))
        setTimeout(() => {
          navigate('/auth/signIn')
        }, 1500)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsChangePasswordFormVisible(true)
      }
    })
  }, [])

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'} 
    fixed top-0 left-0 nMb:left-1/2 nMb:-translate-x-1/2 nMb:max-w-[425px] w-full h-full overflow-hidden py-3 px-2
  `}>
      <div className='flex items-center gap-x-4 mb-8'>
        <ArrowBackIcon
          className={`h-7 w-7 cursor-pointer ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
          onClick={onGoBackClick}
        />
        <div className='text-3xl font-medium'>{t('resetPassword')}</div>
      </div>
      <div className='mb-4 px-4'>
        <div className='mb-2 text-xl'>{t('enterYourEmailToResetPassword')}</div>
        <TextInput
          placeholder={t('enterEmail') || 'Enter email'}
          value={email}
          onInputChange={onEmailChange}
          onFocus={onEmailFocus}
        />
        {(isEmailDirty && emailError) && <div className='text-red-600 text-sm'>{emailError}</div>}
      </div>

      {isEmailDirty && !emailError && !!email.length && (
        <div>
          <MyButton
            color='black'
            onClick={onResetPasswordClick}
            title='resetPassword'
            p='py-2'
          />
        </div>
      )}

      {isChangePasswordFormVisible && (
        <div className={`fixed top-0 left-0 nMb:left-1/2 nMb:-translate-x-1/2 nMb:max-w-[425px] w-full h-full overflow-hidden py-4 px-2 bg-black bg-opacity-90
        `}>
          <div className='py-4 px-4 border-2 border-white rounded-lg'>
            <div className='mb-6'>
              <div className='flex items-center gap-x-4 mb-4'>
                <CloseIcon
                  className={`h-6 w-6 cursor-pointer ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
                  onClick={handleChangePasswordFormVisible}
                />
                <div className='text-xl'>{t('enterNewPassword')}</div>
              </div>
              <TextInput
                placeholder={t('enterPassword') || 'Enter password'}
                value={password}
                onInputChange={onPasswordChange}
                onFocus={onPasswordFocus}
              />
              {(isPasswordDirty && passwordError) && <div className='text-red-600 text-sm'>{passwordError}</div>}
            </div>

            {isPasswordDirty && !passwordError && !!password.length && (
              <div className='mb-2'>
                <MyButton
                  color='yellow'
                  onClick={onSetNewPassword}
                  title='setNewPassword'
                  p='py-2'
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ResetPassword