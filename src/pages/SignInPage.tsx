import React, { useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import UserEmail from '../components/UserEmail'
import { ReactComponent as ArrowBackIcon } from '../assets/arrowBack.svg'
import { ReactComponent as LogoIcon } from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import supabase from '../supabaseClient'
import { useActions } from '../hooks/useActions'
import MyButton from '../UI/MyButton'
import { IUser } from '../types/Auth/auth'
import { initialUserInfo, initialUserProfile } from '../utils/consts'
import Loader from '../UI/Loader'
import { toast } from 'react-toastify';

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
    navigate('/auth')
  }

  const singIn = async () => {
    if (!isFormValid) {
      return false
    }
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email || '',
        password: password || '',
      })
      console.log('singIn data', data)

      if (error) {
        toast.error(t('wrongEmailOrPassword'))
        throw new Error(error.message)
      }

      const userObj: IUser = {
        id: data.user?.id || '0',
        email: data.user?.email || '0',
        info: data.user?.user_metadata?.info || initialUserInfo,
        interests: data.user?.user_metadata?.interests || [],
        languages: data.user?.user_metadata?.languages || [],
        geo: data.user?.user_metadata?.geo || { coord: { latitude: 0, longitude: 0 }, location: { country: '', city: '' } },
        profile: data.user?.user_metadata?.profile || initialUserProfile
      }
      // console.log('Get user', userObj)
      setUser(userObj)
      navigate('/')
    } catch (e) {
      console.log('singIn error', e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className='flex justify-center items-center py-20'><Loader size='16' /></div>
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'} 
      absolute top-0 w-full min-h-screen overflow-hidden py-3 px-2
    `}>
      <ArrowBackIcon className={`h-7 w-7 mb-5 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`} onClick={onGoBackClick} />
      <div className='flex justify-center'>
        <LogoIcon className={`h-24 w-24 mb-2 fill-yellow-400`} />
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

      <div className='absolute w-full bottom-2 left-0 z-50'>
        <MyButton
          color='black'
          onClick={singIn}
          title='signIn'
          disabled={!isFormValid}
        />
      </div>
    </div>
  )
}

export default SignInPage