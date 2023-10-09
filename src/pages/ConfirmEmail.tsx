import React, { useEffect, useState, useRef } from 'react'
import supabase from '../supabaseClient'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ILang, IUserGeo, IUserInfo, IUserSettings, interest } from '../types/Auth/auth'
import MyButton from '../UI/MyButton'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as SuccessIcon } from '../assets/success.svg'
import { initialUserProfile } from '../utils/consts'
import Loader from '../UI/Loader'
import { toast } from 'react-toastify'

interface ConfirmEmailProps {
  info: IUserInfo | null,
  interests: interest[],
  languages: ILang[],
  geo: IUserGeo,
  email: string,
  password: string,
  isFormValid: boolean
}

const ConfirmEmail = ({ interests, isFormValid, languages, email, geo, info, password }: ConfirmEmailProps) => {
  const { t } = useTranslation()
  const { theme, lang } = useTypedSelector(state => state.theme)
  const navigate = useNavigate()

  const isSendedSignUp = useRef(false)
  const [loading, setLoading] = useState(false)

  const initialUserSettings: IUserSettings = {
    appLang: lang,
    isConfirmBeforeSendLetter: true,
    theme: theme
  }

  const onGoToLoginClick = () => {
    navigate('/auth/signIn', { replace: true })
  }

  useEffect(() => {
    const singUp = async () => {
      setLoading(true)
      const userMetadata = {
        info,
        interests,
        languages,
        geo,
        profile: initialUserProfile,
        settings: initialUserSettings
      }

      try {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: userMetadata
          }
        })

        if (error) {
          throw new Error(error.message)
        }

        const upsertData = await supabase.from('Users')
          .upsert({
            id: data.user?.id,
            email: email.trim(),
            ...userMetadata,
          })
        toast.success(t('successfulSignUp'))

        console.log('signUp upsertData', upsertData);
        console.log('signUp data', data)
      } catch (e) {
        console.log('signUpError', e)
        toast.error('SignUp error ' + e)
      } finally {
        setLoading(false)
      }
    }
    if (isFormValid && !isSendedSignUp.current) {
      singUp()
      isSendedSignUp.current = true
      localStorage.removeItem('signUpData')
    }
  }, [isFormValid, info, interests, languages, geo, email, password, t])

  if (loading) {
    return <div className='flex justify-center py-20'><Loader size='16' /></div>
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'} 
      py-20 px-2 absolute top-0 w-full h-screen flex flex-col justify-between`}
    >
      <div className='flex flex-col items-center text-center font-medium'>
        <SuccessIcon className={`${theme === 'dark' ? 'fill-green-500' : 'fill-green-500'} h-14`} />
        <div className='text-lg'>{t('confirmEmail')}</div>
      </div>

      <MyButton
        color='yellow'
        onClick={onGoToLoginClick}
        title='gotoLogin'
        p='py-2'
      />
    </div>
  )
}

export default ConfirmEmail