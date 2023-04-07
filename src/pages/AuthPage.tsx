import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import MyButton from '../UI/MyButton'
import { ReactComponent as LogoIcon } from '../assets/logo.svg'

const AuthPage = () => {
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className={`
    ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-zinc-900'} 
    min-h-screen flex flex-col justify-between items-center px-2`
    }>
      <div className='text-center flex-1 flex flex-col justify-center'>
        <LogoIcon className={`h-28 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`} />
        <div className='tracking-widest mb-3 text-4xl font-bold text-yellow-400'>SLOWLY</div>
        <div>{t('helloWorld')}</div>
      </div>

      <div className='justify-self-end w-full flex flex-col gap-y-2 pb-5'>
        <MyButton color='yellow' title={'letsStart'} variant='roundedXl' onClick={() => { navigate('/auth/signUp') }} />
        <MyButton color='black' title={'alredyHaveAcc'} variant='roundedXl' onClick={() => { navigate('/auth/signIn') }} />
      </div>
    </div>
  )
}

export default AuthPage