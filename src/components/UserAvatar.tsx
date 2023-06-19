import React, { ChangeEvent, useState } from 'react'
import { ReactComponent as DefaultUserIcon } from '../assets/navbarIcons/user.svg'
import { themeType } from '../types/Theme/theme';
import TextInput from '../UI/TextInput';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface UserAvatarProps {
  userAvatar: string,
  theme: themeType,
  canUpdate?: boolean,
  updateImage?: (url: string) => void
}

const UserAvatar = ({ userAvatar, theme, canUpdate = false, updateImage = () => { } }: UserAvatarProps) => {
  const [avatarUrl, setAvatarUrl] = useState(userAvatar);

  const { user } = useTypedSelector(state => state.auth)
  const { updateUserAvatar } = useActions()

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAvatarUrl(event.target.value);
  };

  const handleSaveImageURL = () => {
    if (!!avatarUrl.length) {
      updateImage(avatarUrl)
      if (user) {
        updateUserAvatar(user, avatarUrl)
      }
    }
  }

  return (
    <div className='w-full'>
      <div className='w-full flex justify-center'>
        {!!avatarUrl.length
          ? <img src={avatarUrl} className='h-32 w-32 rounded-full object-cover' alt="User Avatar" />
          : <DefaultUserIcon className={`h-32 w-32 rounded-full object-cover ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
        }
      </div>

      {canUpdate && (
        <div>
          <div className='flex items-center justify-between mb-2'>
            <div className='text-sm'>Update avatar URL:</div>
            <div className={`${theme === 'dark' ? 'text-white' : 'text-zinc-900'} 
              ${!!avatarUrl.length ? 'opacity-100' : 'opacity-50'}
              border-2 rounded-xl inline-block px-4 py-1 mt-1 text-sm`}
              onClick={handleSaveImageURL}
            >
              Save
            </div>
          </div>

          <TextInput
            onFocus={() => { }}
            onInputChange={handleAvatarChange}
            value={avatarUrl}
          />
        </div>
      )}
    </div>
  );
}

export default UserAvatar