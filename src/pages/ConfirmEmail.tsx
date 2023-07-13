import React, { useEffect, useState } from 'react'
import supabase from '../supabaseClient'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ILang, IUserGeo, IUserInfo, interest } from '../types/Auth/auth'
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
  const { theme } = useTypedSelector(state => state.theme)
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

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
        profile: initialUserProfile
      }

      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: userMetadata
          }
        })

        const upsertData = await supabase.from('Users')
          .upsert({
            id: data.user?.id,
            email,
            ...userMetadata,
          })

        console.log('signUp upsertData', upsertData);

        if (error) {
          throw new Error(error.message)
        }
        toast.success(t('successfulSignUp'))

        console.log('signUp data', data)
      } catch (e) {
        console.log('signUpError', e)
        toast.error('SignUp error ' + e)
      } finally {
        setLoading(false)
      }
    }
    if (isFormValid) {
      singUp()
    }
  }, [isFormValid, info, interests, languages, geo, email, password])

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
      />
    </div>
  )
}

export default ConfirmEmail