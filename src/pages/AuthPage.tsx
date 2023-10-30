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
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-zinc-900'} 
      fixed top-0 left-0 nMb:left-1/2 nMb:-translate-x-1/2 nMb:max-w-[425px] h-full w-full flex flex-col justify-between items-center px-2 py-3`
    }>
      <div className='text-center flex-1 flex flex-col justify-center'>
        <LogoIcon className={`max-w-max mx-auto h-28 w-28 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`} />
        <div className='tracking-widest mb-3 text-4xl font-bold text-yellow-400'>SLOWLY</div>
        <div className='font-medium'>{t('helloWorld')}</div>
      </div>

      <div className='justify-self-end w-full flex flex-col gap-y-2 pb-4'>
        <MyButton color='yellow' title={'letsStart'} onClick={() => { navigate('/auth/signUp') }} p='py-2' />
        <MyButton color='black' title={'alredyHaveAcc'} onClick={() => { navigate('/auth/signIn') }} p='py-2' />
      </div>
    </div>
  )
}

export default AuthPage