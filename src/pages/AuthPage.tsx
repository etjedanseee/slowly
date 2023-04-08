import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import MyButton from '../UI/MyButton'
import { ReactComponent as LogoIcon } from '../assets/logo.svg'
import { ReactComponent as ArrowBackIcon } from '../assets/arrowBack.svg'

const AuthPage = () => {
  const { theme } = useTypedSelector(state => state.theme)
  const { user } = useTypedSelector(state => state.auth)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const onGoBackClick = () => {
    navigate('/')
  }

  return (
    <div className={`
    ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-zinc-900'} 
    min-h-screen flex flex-col justify-between items-center px-2 py-3`
    }>
      {true && (
        <div className='flex justify-start w-full'>
          <ArrowBackIcon
            className={`h-7 w-7 mb-5 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
            onClick={onGoBackClick}
          />
        </div>
      )}
      <div className='text-center flex-1 flex flex-col justify-center'>
        <LogoIcon className={`h-28 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`} />
        <div className='tracking-widest mb-3 text-4xl font-bold text-yellow-400'>SLOWLY</div>
        <div>{t('helloWorld')}</div>
      </div>

      <div className='justify-self-end w-full flex flex-col gap-y-2 pb-3'>
        <MyButton color='yellow' title={'letsStart'} variant='roundedXl' onClick={() => { navigate('/auth/signUp') }} />
        <MyButton color='black' title={'alredyHaveAcc'} variant='roundedXl' onClick={() => { navigate('/auth/signIn') }} />
      </div>
    </div>
  )
}

export default AuthPage