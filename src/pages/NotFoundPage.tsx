import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import MyButton from '../UI/MyButton'

const NotFoundPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const onGoBackClick = () => {
    navigate(-1)
  }

  return (
    <div className={`flex flex-col items-center h-screen`}>
      <div className='text-center flex-1 flex flex-col justify-center'>
        <div className='text-8xl text-yellow-400 font-bold'>404</div>
        <div className='font-medium text-xl'>{t('notFoundPage')}</div>
      </div>

      <div className='mb-4 w-full px-4'>
        <MyButton
          color='black'
          onClick={onGoBackClick}
          title='goBack'
          p='py-2'
        />
      </div>
    </div>
  )
}

export default NotFoundPage