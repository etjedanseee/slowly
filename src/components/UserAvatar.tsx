import React, { ChangeEvent, useEffect, useState } from 'react'
import { ReactComponent as DefaultUserIcon } from '../assets/navbarIcons/user.svg'
import TextInput from '../UI/TextInput';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface UserAvatarProps {
  userAvatar: string,
  canUpdate?: boolean,
  updateImage?: (url: string) => void,
  size?: number
}

const UserAvatar = ({ userAvatar, canUpdate = false, updateImage = () => { }, size }: UserAvatarProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const [avatarUrl, setAvatarUrl] = useState(userAvatar);
  const [isValidImage, setIsValidImage] = useState(true);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value
    setAvatarUrl(url);
    checkIsValidImage(url)
  };

  const checkIsValidImage = (url: string) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setIsValidImage(true)
    }
    img.onerror = () => {
      setIsValidImage(false)
    }
  }

  const handleSaveImageURL = () => {
    if (isValidImage && (avatarUrl !== userAvatar)) {
      updateImage(avatarUrl)
    }
  }

  useEffect(() => {
    setAvatarUrl(userAvatar)
  }, [userAvatar])

  return (
    <div className='w-full'>
      <div className='w-full flex justify-center'>
        {isValidImage && userAvatar.length
          ? <img src={avatarUrl} className={`${size ? `h-${size} w-${size}` : 'h-32 w-32'} rounded-full object-cover`} alt="User Avatar" />
          : <DefaultUserIcon className={`${size ? `h-${size} w-${size}` : 'h-32 w-32'} rounded-full object-cover ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
        }
      </div>

      {canUpdate && (
        <div>
          <div className='flex items-center justify-between mb-2'>
            <div className='text-sm'>Update avatar URL:</div>
            <div className={`${theme === 'dark' ? 'text-white' : 'text-zinc-900'} 
              ${isValidImage && avatarUrl !== userAvatar ? 'opacity-100 cursor-pointer' : 'opacity-50'}
              border-2 rounded-xl inline-block px-4 py-[2px] mt-1 text-sm`}
              onClick={handleSaveImageURL}
            >
              Save
            </div>
          </div>

          <TextInput
            onBlur={() => { }}
            onInputChange={handleAvatarChange}
            value={avatarUrl}
          />
        </div>
      )}
    </div>
  );
}

export default UserAvatar