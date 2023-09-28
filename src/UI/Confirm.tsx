import React from 'react'
import { useTranslation } from 'react-i18next'

interface IConfirmProps {
  text: string,
  onCancel: () => void,
  onConfirm: () => void
}

const Confirm = ({ text, onCancel, onConfirm }: IConfirmProps) => {
  const { t } = useTranslation()
  return (
    <div className='fixed min-h-full h-full w-full top-0 left-0 nMb:left-1/2 nMb:-translate-x-1/2 nMb:max-w-[425px] z-50 px-3 py-4 bg-black bg-opacity-90'>
      <div className='py-3 border-2 border-yellow-400 px-4'>
        <div className='text-xl font-bold mb-4 text-center'>⚠️{text}</div>
        <div className='flex justify-around items-center'>
          <div
            onClick={onConfirm}
            className='text-green-500 font-medium py-1 px-2 cursor-pointer hover:text-green-600'
          >{t('confirm')}</div>
          <div
            onClick={onCancel}
            className='text-red-600 font-medium py-1 px-2 cursor-pointer hover:text-red-700'
          >{t('cancel')}</div>
        </div>
      </div>
    </div>
  )
}

export default Confirm