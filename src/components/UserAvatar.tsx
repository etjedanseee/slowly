import React, { ChangeEvent, useEffect, useState } from 'react'
import { ReactComponent as DefaultUserIcon } from '../assets/navbarIcons/user.svg'
import { ReactComponent as СloseIcon } from '../assets/close.svg'
import TextInput from '../UI/TextInput';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useTranslation } from 'react-i18next';

interface UserAvatarProps {
  userAvatar: string,
  canUpdate?: boolean,
  updateImage?: (url: string) => void,
  size?: number
}

const UserAvatar = ({ userAvatar, canUpdate = false, updateImage = () => { }, size }: UserAvatarProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()
  const [avatarUrl, setAvatarUrl] = useState(userAvatar);
  const [isValidImage, setIsValidImage] = useState(false);
  const [isFullSizeModalVisible, setIsFullSizeModalVisible] = useState(false)

  const handleFullSizeModalVisible = () => {
    setIsFullSizeModalVisible(prev => !prev)
  }

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value
    setAvatarUrl(url);
    setIsValidImage(false)
  };

  const onSuccessfulLoadImage = () => {
    setIsValidImage(true)
  }

  const onErrorLoadImage = () => {
    setIsValidImage(false)
  }

  const handleSaveImageURL = () => {
    updateImage(avatarUrl)
  }

  useEffect(() => {
    setAvatarUrl(userAvatar)
  }, [userAvatar])

  useEffect(() => {
    if (isFullSizeModalVisible) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isFullSizeModalVisible])

  return (
    <div className='w-full'>
      <div className='w-full flex justify-center'>
        {avatarUrl.length ? (
          <img
            src={avatarUrl}
            className={`${size ? `h-${size} w-${size}` : 'h-32 w-32'} ${!canUpdate && 'cursor-pointer'} rounded-full object-cover`}
            onClick={!canUpdate ? handleFullSizeModalVisible : () => { }}
            onLoad={onSuccessfulLoadImage}
            onError={onErrorLoadImage}
            alt="User Avatar"
          />
        )
          : (
            <DefaultUserIcon
              className={`${size ? `h-${size} w-${size}` : 'h-32 w-32'} 
              rounded-full object-cover ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}
            `}
            />
          )
        }
      </div>

      {canUpdate && (
        <div>
          <div className='flex items-center justify-between mb-1'>
            <div>{t('avatar')}</div>
            {!!avatarUrl.length && isValidImage && avatarUrl !== userAvatar && (
              <div className={`${theme === 'dark' ? 'text-white' : 'text-zinc-900'} 
                  cursor-pointer border-2 rounded-xl inline-block px-4 py-[2px] mt-1 text-sm
                `}
                onClick={handleSaveImageURL}
              >
                {t('save')}
              </div>
            )
            }
          </div>

          <TextInput
            placeholder={t('enterUrl')}
            onInputChange={handleAvatarChange}
            value={avatarUrl}
          />

          {(!isValidImage || !avatarUrl.length) && (
            <div className='text-red-600 text-sm'>{t('enterValidUrl')}</div>
          )}
        </div>
      )}

      {isFullSizeModalVisible && (
        <div className={`fixed top-0 left-0 nMb:left-1/2 nMb:-translate-x-1/2 nMb:max-w-[425px] z-50 h-full w-full
        ${theme === 'dark' ? 'bg-zinc-800' : 'bg-slate-200'}
        `}>
          <div className={`${theme === 'dark' ? 'bg-zinc-900' : 'bg-slate-300'} w-full pl-2 py-2`}>
            <СloseIcon
              className={`h-7 w-7 cursor-pointer ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
              onClick={handleFullSizeModalVisible}
            />
          </div>
          <img
            src={avatarUrl}
            className={`w-full max-w-full h-auto object-cover`}
            alt="User Avatar"
          />
        </div>
      )}
    </div>
  );
}

export default UserAvatar