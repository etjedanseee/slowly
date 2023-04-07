import React, { useEffect } from 'react'
import supabase from '../supabaseClient'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ILang, IUserGeo, IUserInfo, interest } from '../types/Auth/auth'
import MyButton from '../UI/MyButton'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as CheckMarkIcon } from '../assets/checkmark.svg'

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

  const onGoToLoginClick = () => {
    navigate('/auth/signIn')
  }

  useEffect(() => {
    const singUp = async () => {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              info,
              interests,
              languages,
              geo
            }
          }
        })
        if (error) {
          throw new Error(error.message)
        }
        console.log('singUp data', data)
      } catch (e) {
        console.log('singUp error', e)
        // setAuthError('Ошибка при регистрации')
      }
    }
    if (isFormValid) {
      singUp()
    }
  }, [isFormValid, info, interests, languages, geo, email, password])

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-zinc-900'} 
    py-20 px-2 absolute top-0 w-full h-screen flex flex-col justify-between`}>
      <div className='flex flex-col items-center text-center font-medium'>
        <CheckMarkIcon className={`${theme === 'dark' ? 'fill-green-500' : 'fill-green-500'} h-14`} />
        <div className='text-2xl mb-4'>{t('successfulSignUp')}</div>
        <div className='text-lg'>{t('confirmEmail')}</div>
      </div>
      <MyButton
        color='yellow'
        onClick={onGoToLoginClick}
        title='gotoLogin'
        variant='roundedXl'
      />
    </div>
  )
}

export default ConfirmEmail