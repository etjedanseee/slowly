import React, { useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import UserEmail from '../components/UserEmail'
import { ReactComponent as ArrowBackIcon } from '../assets/arrowBack.svg'
import { ReactComponent as LogoIcon } from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useActions } from '../hooks/useActions'
import MyButton from '../UI/MyButton'
import Loader from '../UI/Loader'
import { singIn } from '../utils/signIn'

const SignInPage = () => {
  const [email, setEmail] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [isFormValid, setIsFormValid] = useState(false)
  const [loading, setLoading] = useState(false)

  const { theme } = useTypedSelector(state => state.theme)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { setUser } = useActions()

  const onGoBackClick = () => {
    navigate(-1)
  }

  const onResetPasswordClick = () => {
    navigate('/auth/resetPassword')
  }

  const onSignInClick = () => {
    if (isFormValid && email && password) {
      singIn({ email, navigate, password, setLoading, setUser, t })
    }
  }

  if (loading) {
    return <div className='flex justify-center items-center py-20'><Loader size='16' /></div>
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'} 
      fixed top-0 left-0 nMb:left-1/2 nMb:-translate-x-1/2 nMb:max-w-[425px] w-full h-full overflow-hidden py-3 px-2
    `}>
      <ArrowBackIcon
        className={`h-7 w-7 mb-5 cursor-pointer ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
        onClick={onGoBackClick}
      />
      <div className='flex justify-center'>
        <LogoIcon className={`h-28 w-28 mb-2 fill-yellow-400`} />
      </div>
      <div className='text-4xl text-center font-medium'>{t('welcome')}</div>

      <div className='relative'>
        <UserEmail
          setIsUserEmailValid={setIsFormValid}
          setUserEmail={setEmail}
          setUserPassword={setPassword}
          userEmail={email}
          userPassword={password}
        />
      </div>

      <div className='absolute w-full bottom-4 left-0 z-50 px-2'>
        <div
          onClick={onResetPasswordClick}
          className='text-center text-red-500 mb-2 cursor-pointer hover:underline'
        >
          {t('forgotPassword')}
        </div>
        <MyButton
          color='black'
          onClick={onSignInClick}
          title='signIn'
          disabled={!isFormValid}
          p='py-2'
        />
      </div>
    </div>
  )
}

export default SignInPage