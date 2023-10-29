import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import MyButton from '../UI/MyButton'
import Loader from '../UI/Loader'

const NotFoundPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [timeLoading, setTimeLoading] = useState(0)

  useEffect(() => {
    const timeLoadingTimeout = setTimeout(() => { setTimeLoading(1000) }, 1000)
    return () => { clearTimeout(timeLoadingTimeout) }
  }, [])

  const onGoBackClick = () => {
    navigate(-1)
  }

  //first second show loader(wait when user state changed from null to userObj)
  if (!timeLoading) {
    return <div className='flex justify-center py-20'><Loader size='16' /></div>
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